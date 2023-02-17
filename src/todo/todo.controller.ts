import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { CreateTodoDto } from 'src/DTO/create.todo.dto';
import { TodoEntity, TodoStatus } from "src/Entity/todo.entity";
import { UserEntity } from 'src/Entity/user.entity';
import { TodoStatusValidation } from 'src/pipes/TodoStatusValidation';
import { TodoService } from './todo.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Todos')
@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {}

  //http Get verb
  @Get()
  @ApiCreatedResponse({
    description:'All the todo',
  })
  @ApiBadRequestResponse({
    description:'Error. Try again'
  })
  getAllTodos(@User() user: UserEntity) {
    //console.log(this.todoService.getAllTodos());
    return this.todoService.getAllTodos(user);
  }

  @Post()
  @ApiCreatedResponse({
    description:'Todo created',
    type:TodoEntity
  })
  @ApiBadRequestResponse({
    description:'todo cannot create. Try again'
  })
  createNewTodo(
    @Body(ValidationPipe) data: CreateTodoDto,
    @User() user: UserEntity,
  ) {
    return this.todoService.createTodo(data, user);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    description:'todo Updated',
    type:TodoEntity
  })
  @ApiBadRequestResponse({
    description:'Error. Try again'
  })
  updateTodo(
    @Body('status', TodoStatusValidation) status: TodoStatus,
    @Param('id') id: number,
    @User() user: UserEntity,
  ) {
    return this.todoService.update(id, status, user);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description:'Todo deleted',
  })
  @ApiBadRequestResponse({
    description:'Error. Try again'
  })
  deleteTodo(@Param('id') id: number, @User() user: UserEntity) {
    return this.todoService.delete(id, user);
  }
}
