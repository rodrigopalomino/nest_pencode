import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signinDto';
import { Request } from 'express';
import { DeleteUserDto } from './dto/deleteUserDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  deleteUser(@Req() req: Request, @Body() deleteUserDto: DeleteUserDto) {
    const user_id = req.user['user_id'];
    return this.authService.deleteUser(user_id, deleteUserDto);
  }
}
