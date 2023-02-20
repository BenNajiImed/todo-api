import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RegisterUserDTO } from 'src/DTO/registerUser.dto';
import { UserLoginDto } from 'src/DTO/userLogin.dto';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from '../Entity/user.entity';

//? http://localhost:3000/auth
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    description: 'User cannot register. Try again',
  })
  registration(@Body(ValidationPipe) regDTO: RegisterUserDTO) {
    return this.authService.registreUser(regDTO);
  }

  @Post('login')
  @ApiCreatedResponse({
    description: 'User login',
  })
  @ApiBadRequestResponse({
    description: 'User cannot Login. Try again',
  })
  signIn(@Body(ValidationPipe) loginDTO: UserLoginDto) {
    return this.authService.loginUser(loginDTO);
  }
}
