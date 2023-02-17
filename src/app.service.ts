import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "This is the apis of the project Todo-app /n " +
      "you can see all the api in the files beyond";
  }
}
