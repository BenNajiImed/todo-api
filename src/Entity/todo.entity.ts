/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity('todos')
export class TodoEntity {
  [x: string]: any;
  @ApiProperty({
    description:'Todo id',
    example:'1',
  })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({
    description:'Todo title',
    example:'Mario first todo',
  })
  @Column()
  title: string;
  @ApiProperty({
    description:'Todo description',
    example:'prepare lunch',
  })
  @Column()
  description: string;
  @ApiProperty({
    description:'Todo status',
    example:'OPEN',
  })
  @Column()
  status: TodoStatus;

  @ManyToOne(()=>UserEntity, (user: UserEntity)=> user.todos)
  user: UserEntity;
  @ApiProperty({
    description:'The user id ',
    example:'2'
  })
  @Column()
  userId: number;
}
export enum TodoStatus {
  OPEN = 'OPEN',
  WIP = 'WIP',
  COMPLETED = 'COMPLETED',
}
