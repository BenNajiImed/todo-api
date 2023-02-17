import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from 'src/DTO/create.todo.dto';
import { TodoEntity, TodoStatus } from 'src/Entity/todo.entity';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private repo: Repository<TodoEntity>,
  ) {}
  async getAllTodos(user: UserEntity) {
    /* return await this.repo.find(); */
    const query = await this.repo.createQueryBuilder('todo');

    query.where('todo.userId= :userId', { userId: user.id });

    try {
      return await query.getMany();
    } catch (error) {
      throw new NotFoundException('No todo found');
    }
  }
  async createTodo(CreateTodoDto: CreateTodoDto, user: UserEntity) {
    const todo = new TodoEntity();
    const { title, description } = CreateTodoDto;
    todo.title = title;
    todo.description = description;
    todo.status = TodoStatus.OPEN;
    todo.userId = user.id;
    this.repo.create(todo);
    return await this.repo.save(todo);
  }
  async update(id: number, status: TodoStatus, user: UserEntity) {
    try {
      // @ts-ignore
      await this.repo.update({ id, userId: user.id }, { status });
      return this.repo.findOne({ where: { id: id } });
    } catch (error) {
      throw new InternalServerErrorException('Somthing went wrong');
    }
  }
  async delete(id: number, user: UserEntity) {
    const result = await this.repo.delete({ id, userId: user.id });
    if (result.affected == 0) {
      throw new NotFoundException('Todo not deleted');
    } else {
      return { success: true };
    }
  }
}
