import { Injectable, Logger } from "@nestjs/common";
import { IMessagesRepository } from "application/ports/IMessagesRepository";
import { IRoomRepository } from "application/ports/IRoomRepository";
import e from "cors";
import { MessageModel } from "domain/models/MessageModel";

import { ServiceResponse } from "infrastructure/utils/ServiceResponse";

@Injectable()
export class MessageUseCase {
  private readonly logger = new Logger(MessageUseCase.name);
  public serviceRes = new ServiceResponse();
  constructor(
    private readonly roomRepo: IRoomRepository, 
    private readonly messageRepo: IMessagesRepository) {}

  async addMessageRoom(entity: MessageModel){
    if (entity.is_doctor === 'true') {
      this.logger.log("Верифицируем доктора");
      const data = await this.roomRepo.getDoctorIdByToken(entity.token);
      if (data.id) {
        entity.from_user_id = data.id;
        this.logger.log("Верифицируем пользователя");
        const result = await this.roomRepo.getUserIdByEmail(entity.to_user_email);
        console.log(result);
        if (result[0].id) {
          this.logger.log(`Пользователь верифицирован`);
          entity.to_user_id = result[0].id;
          this.logger.log(`Добавляем сообщение пользователя в комнату`);
          const data = await this.messageRepo.addMessage(entity);
          return this.serviceRes.messageSuccessAdded()
        } else {
          this.logger.log(`Пользователь не верифицирован`);
          return result;
        }
      }
    } else {
      this.logger.log(`Верифицируем пользователя`);
      const result = await this.roomRepo.getUserIdByToken(entity.token);
      if (result[0].id) {
        entity.from_user_id = result[0].id;
        this.logger.log(`Верифицируем доктора`);
        const data = await this.roomRepo.getDocIdByEmail(entity.to_user_email);
        if (data[0].id) {
          this.logger.log(`Доктор верифицирован`);
          entity.to_user_id = data[0].id;
          this.logger.log(`Добавляем сообщение пользователя в комнату`);
          const result = await this.messageRepo.addMessage(entity);
          return this.serviceRes.messageSuccessAdded()
        } else {
          this.logger.log(`Пользователь не верифицирован`);
          return data;
        }
      }
    }
    
    
  }

  async getAllMessage(entity: MessageModel){
    this.logger.log(`Получаем данные сообщений комнаты`);
    const result = await this.messageRepo.getAllMessage(entity);
    if(result){
      this.logger.log(`Сообщения успешно получены`);
      return this.serviceRes.uniqueSuccessRes(result);
    }
    else{
      this.logger.log(`Сообщения не найдены`);
      return this.serviceRes.messagesNotFound();
    }
  }

 
}
