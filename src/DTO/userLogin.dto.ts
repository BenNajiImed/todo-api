/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UserLoginDto {
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
  password: string;
}
