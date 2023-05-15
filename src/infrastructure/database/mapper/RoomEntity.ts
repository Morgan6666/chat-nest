import { RoomModel } from "domain/models/RoomModel";
import { Any, Entity, EntitySchema } from "typeorm";
import { BaseEntity } from "./BaseEntity";


export const RoomEntity = new EntitySchema<RoomModel> ({
    name: "Rooms",
    tableName: "room",
    columns: {
        ...BaseEntity,
        roomName: {
            type: String
        }
    }
})