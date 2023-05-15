import { IEntity } from "domain/shared/IEntity";

export class UsersRoomModel implements IEntity {
    user_id?: number
    socketId?: string

    equals(entity: IEntity): boolean {
        if (!(entity instanceof UsersRoomModel)) return false;
        return this.user_id === entity.user_id;
      }
}