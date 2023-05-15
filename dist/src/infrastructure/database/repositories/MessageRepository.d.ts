import { BaseRepository } from "./BaseRepository";
import { MessageModel } from "domain/models/MessageModel";
import { IMessagesRepository } from "application/ports/IMessagesRepository";
import { Connection } from "typeorm";
import { HttpService } from "@nestjs/axios";
export declare class MessageRepository extends BaseRepository<MessageModel> implements IMessagesRepository {
    private readonly httpService;
    connection: Connection;
    constructor(connection: Connection, httpService: HttpService);
    addMessage(entity: MessageModel): Promise<any>;
    getAllMessage(entity: MessageModel): Promise<any>;
}
