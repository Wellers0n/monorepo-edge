import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBodyDTO } from './dtos/login-body.dto';
import { RegisterBodyDTO } from './dtos/register-body.dto';
import {
  ApiConflictResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  AuthUnauthorizedResponse,
  AuthOkResponse,
  AuthConflictResponse,
} from './swagger/auth.swagger';

@Controller('auth')
@ApiTags('Session')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ type: AuthOkResponse })
  @ApiUnauthorizedResponse({ type: AuthUnauthorizedResponse })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: LoginBodyDTO) {
    const { email, password } = body;
    return this.authService.signIn({ email, password });
  }

  @ApiOkResponse({ type: AuthOkResponse })
  @ApiConflictResponse({ type: AuthConflictResponse })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  getProfile(@Body() body: RegisterBodyDTO) {
    const { email, password, name } = body;
    return this.authService.register({ name, email, password });
  }
}
