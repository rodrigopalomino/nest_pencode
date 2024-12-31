import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SigninDto } from './dto/signinDto';
import { DeleteUserDto } from './dto/deleteUserDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly JwtService: JwtService,
    private readonly ConfigService: ConfigService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { name, email, username, password } = signupDto;

    //Verificar si ya existe correo
    const userEmail = await this.prismaService.user.findUnique({
      where: { email },
    });

    //Error si el email ya esta en uso
    if (userEmail) throw new ConflictException('Este email esta en uso');

    //Verificar el username
    const userExisting = await this.prismaService.user.findUnique({
      where: { username },
    });

    //Error si el username ya existe
    if (userExisting) throw new ConflictException('Este username esta en uso');

    //Cifrar la contraseña
    const hashPassword = await bcrypt.hash(password, 8);

    //Crear el nuevo usuario
    const newUser = await this.prismaService.user.create({
      data: { name, email, username, password: hashPassword },
    });

    //Retornar
    return { data: newUser };
  }

  async signin(signinDto: SigninDto) {
    const { username, password } = signinDto;

    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (!user) throw new UnauthorizedException('Username  incorrecta');

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new UnauthorizedException(' o password incorrecta');

    const payload = {
      sub: user.user_id,
      username: user.username,
    };

    const token = this.JwtService.sign(payload, {
      expiresIn: '1d',
      secret: this.ConfigService.get('JWT_SECRET'),
    });

    return { token, user: { ...user, password: undefined } };
  }

  async deleteUser(user_id: number, deleteUserDto: DeleteUserDto) {
    const { password } = deleteUserDto;

    const user = await this.prismaService.user.findUnique({
      where: { user_id },
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new UnauthorizedException('Password incorrecta');

    await this.prismaService.user.delete({ where: { user_id } });

    return { message: 'Usuario eliminado' };
  }
}
