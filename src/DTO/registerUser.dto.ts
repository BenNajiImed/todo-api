/* eslint-disable prettier/prettier */
import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDTO {
  @ApiProperty({
     description:'The username',
     example:'Mario',
  })
  @IsNotEmpty()
  username: string;
  @ApiProperty({
    description:'The user password',
    example:'3Test@123',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  @Matches( /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak, choose a stronger password between 6 and 12 characters',
  })
  password: string;
@IsNotEmpty()
@MinLength(6)
@MaxLength(12)
@Matches('password')
  passwordConfirm:string;

}
