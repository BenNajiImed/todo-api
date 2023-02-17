/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity('users')
export class UserEntity {
  @ApiProperty({
    description:'The user id',
    example:54,
  })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({
    description:'The username',
    example:'Mario',
  })
  @Column()

  username: string;
  @ApiProperty({
    description:'Hashed user password',
    example:'3Test@123',
  })
  @Column()
  password: string;
  @Column()
  salt: string;
  @OneToMany(()=> TodoEntity, (todo: TodoEntity)=> todo.user)
  todos: TodoEntity[]

/*   async verifyPassword(password: string){
    const hash = await bcrypt.hash( password, this.salt)
    return hash == this.password;
    //await bcrypt.compare(password,this.password,);
  } */
}
