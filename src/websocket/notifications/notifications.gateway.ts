import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class NotificationsGateway {
  @WebSocketServer()
  server: Server; // El servidor WebSocket

  @SubscribeMessage('message') // Este es el mensaje que los clientes pueden enviar
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ): void {
    socket.emit('response', { message: 'Mensaje recibido correctamente' });
  }

  // Método para enviar mensajes a todos los clientes
  sendNotification(message: string) {
    this.server.emit('notification', message); // Envia un mensaje a todos los clientes conectados
  }
}

//El decorador Subscribe Message nos permite definir como se va a llamar el elemento
//data es el contenido del mensaje y el decorador MessageBody es para que se reconozca como un mensaje que viene dentro del socket
