import { Module } from "@nestjs/common";
import { RoomController } from "presentation/controllers/RoomController";
import { AppGateway } from "presentation/gateway/WebSocketsGateWay";
import { RoomModule } from "./room.module";
import { RoomUseCase } from "application/use-cases/RoomUseCase";
import { RoomRepository } from "infrastructure/database/repositories/RoomRepository";
import { IRoomRepository } from "application/ports/IRoomRepository";
import { MessageModule } from "./messages.module";
import { MessageUseCase } from "application/use-cases/MessageUseCase";
import { IMessagesRepository } from "application/ports/IMessagesRepository";
import { MessageRepository } from "infrastructure/database/repositories/MessageRepository";
import { HttpModule } from '@nestjs/axios';


@Module({
    imports: [RoomModule, MessageModule, HttpModule],
    controllers: [],
    providers: [AppGateway,
         RoomUseCase,
         {provide:IRoomRepository,useClass: RoomRepository},
         MessageUseCase,
         {provide: IMessagesRepository, useClass: MessageRepository}
        ]
})
export class GatewayModule {}