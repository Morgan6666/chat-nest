import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { MessageUseCase } from "application/use-cases/MessageUseCase";
import { RoomUseCase } from "application/use-cases/RoomUseCase";
import { MessageModel } from "domain/models/MessageModel";
import { RoomModel } from "domain/models/RoomModel";
import { Socket, Server } from "socket.io";
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private roomUsecase;
    private messageUseCase;
    constructor(roomUsecase: RoomUseCase, messageUseCase: MessageUseCase);
    server: Server;
    private readonly logger;
    handleChatEvent(socket: Socket, payload: MessageModel): Promise<void>;
    getAllMessage(socket: Socket, payload: MessageModel): Promise<void>;
    getOnlineUser(socket: Socket): Promise<void>;
    handleSetClientDataEvent(client: Socket, payload: RoomModel): Promise<any>;
    afterInit(server: Server): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleConnection(client: Socket): Promise<void>;
}
