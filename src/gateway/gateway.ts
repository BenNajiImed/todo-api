import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { OnModuleInit } from "@nestjs/common";

@WebSocketGateway(
  3001,{
    cors: {
      origin: '*',
    }
  }
)
export class MyGateway implements OnModuleInit{



  @WebSocketServer()
  server:Server;
  @SubscribeMessage("newMessage")
  onNewMessage(@MessageBody() body: any){
    console.log(body);
    this.server.emit('onMessage',{
      msg:'New Message',
      content: body,
    })
  }
  onModuleInit(): any {
    this.server.on('connection', (socket)=>{
      console.log(socket.id);
      console.log('connected');
    })
  }
}