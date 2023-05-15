import { IEntity } from "domain/shared/IEntity";
import { UsersRoomModel } from "./UsersRoomModel";

export class CheckUserInRoomModel implements IEntity{
    roomName: string;
    user: UsersRoomModel

    equals(entity: IEntity): boolean {
        if (!(entity instanceof CheckUserInRoomModel)) return false;
        return this.user=== entity.user;
      }
}