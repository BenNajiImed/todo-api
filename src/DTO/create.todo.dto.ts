/* eslint-disable prettier/prettier */
import { IsNotEmpty, MaxLength,  } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoDto {
  @ApiProperty({
    description:'Todo title',
    example:'Lunch',
  })
  @IsNotEmpty()
  @MaxLength(15, { message: 'Max length is 15 characters.' })
  title: string;
  @ApiProperty({
    description:'Todo description',
    example:'prepare lunch',
  })
  @IsNotEmpty()
  description: string;
}
