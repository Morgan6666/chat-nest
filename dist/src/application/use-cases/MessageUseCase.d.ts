import { IMessagesRepository } from "application/ports/IMessagesRepository";
import { IRoomRepository } from "application/ports/IRoomRepository";
import { MessageModel } from "domain/models/MessageModel";
import { ServiceResponse } from "infrastructure/utils/ServiceResponse";
export declare class MessageUseCase {
    private readonly roomRepo;
    private readonly messageRepo;
    private readonly logger;
    serviceRes: ServiceResponse;
    constructor(roomRepo: IRoomRepository, messageRepo: IMessagesRepository);
    addMessageRoom(entity: MessageModel): Promise<any>;
    getAllMessage(entity: MessageModel): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
}
