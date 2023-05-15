import { IEntity } from "domain/shared/IEntity";
import { UsersRoomModel } from "./UsersRoomModel";

export class MessageModel implements IEntity {
    host?: UsersRoomModel
    timeSent?: string;
    timeUpdate?: string;
    message?: string
    from_user_id? : number;
    to_user_id?: number;
    room_name?: string;
    token?: string;
    to_user_email?: string;
    is_doctor?: string;

    equals(entity: IEntity): boolean {
        if (!(entity instanceof MessageModel)) return false;
        return this.from_user_id === entity.to_user_id;
      }

}