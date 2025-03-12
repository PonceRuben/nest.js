import { SubscribeMessage, WebSocketGateway, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class NotificationsGateway {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() socket: Socket): string {
    socket.emit('message', {name: 'Nest'}, (data) =>console.log(data))
    return (data);
  }
}
