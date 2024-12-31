import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

type Payload = {
  sub: number;
  username: string;
};

@Injectable()
export class StrategyService extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const user = this.prismaService.user.findUnique({
      where: { username: payload.username },
    });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    Reflect.deleteProperty(user, 'password');
    return user;
  }
}
