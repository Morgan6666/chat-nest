import { thisTypeAnnotation } from "@babel/types";
import { Logger } from "@nestjs/common";
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from "@nestjs/websockets";
import { MessageUseCase } from "application/use-cases/MessageUseCase";
import { RoomUseCase } from "application/use-cases/RoomUseCase";
import e from "cors";
import { MessageModel } from "domain/models/MessageModel";
import { RoomModel } from "domain/models/RoomModel";
import { UsersRoomModel } from "domain/models/UsersRoomModel";
import { ConsoleWriter } from "istanbul-lib-report";
import { SocketReadyState } from "net";
import { userInfo } from "os";
import { Socket, Server } from "socket.io";
import { Entity } from "typeorm";

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{ 
  constructor(private roomUsecase: RoomUseCase, private messageUseCase: MessageUseCase){}
  @WebSocketServer()
  server: Server;
  private readonly logger = new Logger(AppGateway.name);
    

  @SubscribeMessage("send_message")
  async handleChatEvent(socket: Socket, payload: MessageModel) {
    this.logger.log(`Добавляем сообщение пользователя`);
    payload.is_doctor = String(socket.handshake.query.is_doctors);
    payload.token = String(socket.handshake.query.token);
    const message = await this.messageUseCase.addMessageRoom(payload);
    this.logger.log(`Получаем данные соккетов комнаты`);
    const result = await this.roomUsecase.getRoomSocketId(payload.room_name);
    this.logger.log(`Сообщения получены`);
    for(let k =0; k< result.length; k++){
      this.server.to(result[k]).emit("receive_message", payload.message);
    }
  }
  
  @SubscribeMessage("get_all_messages")
  async getAllMessage(socket: Socket, payload: MessageModel){
    this.logger.log(`Получаем данные сообщений`);
    const message = await this.messageUseCase.getAllMessage(payload);
    this.logger.log(`Получаем данные сокетов`);
    const result = await this.roomUsecase.getRoomSocketId(payload.room_name);
    for(let k =0; k< result.length; k++){
      this.server.to(result[k]).emit("receive_message", message);
    }
  }

  @SubscribeMessage("get_online_user")
  async getOnlineUser(socket: Socket){
    this.logger.log(`Получаем информацию о пользователях`);
    const token = String(socket.handshake.query.token);
    const is_doc = String(socket.handshake.query.is_doctors);
    const users  = await this.roomUsecase.getAllUserForUsers(token, is_doc);
    this.server.emit("receive_users", users);
    
  }

  @SubscribeMessage('join_room')
  async handleSetClientDataEvent(client: Socket, payload: RoomModel){
    this.logger.log(`Создаём комнату`);
    console.log(client.id);
    payload.host.socketId= client.id;
    payload.token = String(client.handshake.query.token);
    payload.is_doctor = String(client.handshake.query.is_doctors);
    const  result = await this.roomUsecase.addUserToRoom(payload);
    return result;
  }


  async afterInit(server: Server) {
    this.logger.log(" Server is init");
  }
  async handleDisconnect(client: Socket) {
    this.logger.log(`Пользователь отключается:${client.id}`);
    await this.roomUsecase.disconnectAndVerifyUser(String(client.handshake.query.token), String(client.handshake.query.is_doctors));
    
  }
  async handleConnection(client: Socket) {
    this.logger.log(`Пользователь:${client.id} подключился`);
    await this.roomUsecase.addConnectionAndVerify(String(client.handshake.query.token), client.id, String(client.handshake.query.is_doctors));
    
  }
}
