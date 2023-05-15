import { IEntity } from "domain/shared/IEntity";
import { UsersRoomModel } from "./UsersRoomModel";

export class AddRoomModel implements IEntity {
    roomName: string
    host: UsersRoomModel

    equals(entity: IEntity): boolean {
        if (!(entity instanceof AddRoomModel)) return false;
        return this.roomName === entity.roomName;
      }
}