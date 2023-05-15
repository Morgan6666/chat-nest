import { moduleExpression } from "@babel/types";
import { Module } from "@nestjs/common";
import { IMessagesRepository } from "application/ports/IMessagesRepository";
import { MessageUseCase } from "application/use-cases/MessageUseCase";
import { MessageRepository } from "infrastructure/database/repositories/MessageRepository";
import { HttpModule } from '@nestjs/axios';
import { RoomModule } from "./room.module";
import { RoomUseCase } from "application/use-cases/RoomUseCase";
import { CheckUserInRoomModel } from "domain/models/CheckUserInRoomModel";
import { IRoomRepository } from "application/ports/IRoomRepository";
import { RoomRepository } from "infrastructure/database/repositories/RoomRepository";

@Module({
    imports: [HttpModule, RoomModule],
    controllers: [],
    providers:[
        MessageUseCase,
        {provide: IMessagesRepository, useClass: MessageRepository},
        RoomUseCase,
        {provide: IRoomRepository, useClass: RoomRepository}
    ] 
})
export class MessageModule {}