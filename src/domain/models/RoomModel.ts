import { IEntity } from "domain/shared/IEntity";
import { UsersRoomModel } from "./UsersRoomModel";

export class RoomModel implements IEntity {
    roomName?: string;
    host?: UsersRoomModel;
    limit?: number;
    roomId?: number;
    to_user_id?: number;
    token?: string
    is_doctor?: string;
    to_user_email?: string;
    

    equals(entity: IEntity): boolean {
        if (!(entity instanceof RoomModel)) return false;
        return this.roomName=== entity.roomName;
      }
}