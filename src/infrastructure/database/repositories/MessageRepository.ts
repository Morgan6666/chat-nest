import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./BaseRepository";
import { MessageModel } from "domain/models/MessageModel";
import { IMessagesRepository } from "application/ports/IMessagesRepository";
import { Connection } from "typeorm";
import { MessageEntity } from "../mapper/MessageEntity";
import { InjectConnection } from "@nestjs/typeorm";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class MessageRepository
  extends BaseRepository<MessageModel>
  implements IMessagesRepository
{
  connection: Connection;
  

  constructor(@InjectConnection() connection: Connection, private readonly httpService: HttpService) {
    super(connection, MessageEntity);
    this.connection = connection;
  }

  async addMessage(entity: MessageModel) {
    console.log(`INSERT INTO messages(time_sent, time_update, message, room_id) VALUES(now(), now(), '${entity.message}', (SELECT id FROM rooms WHERE room_name='${entity.room_name}'));`)
    const result  = await this.connection.query(
      `INSERT INTO messages(time_sent, time_update, message, room_id) VALUES(now(), now(), '${entity.message}', (SELECT id FROM rooms WHERE room_name='${entity.room_name}'));`
      )
    return result;
  }

  async getAllMessage(entity: MessageModel) {
    const result = await this.connection.query(`SELECT message FROM messages WHERE room_id =(SELECT id FROM rooms WHERE room_name='${entity.room_name}');`);
    if(result.length == 0){
      return null;
    }
    else{
      return result;
    }
  }

  
}