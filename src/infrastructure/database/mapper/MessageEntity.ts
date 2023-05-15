import { MessageModel } from "domain/models/MessageModel";
import { BaseEntity, EntitySchema } from "typeorm";



export const MessageEntity = new EntitySchema<MessageModel> ({
    name: "Message",
    tableName: "message",
    columns: {
        ...BaseEntity,
        room_name: {
            type: String
        }
    }
})