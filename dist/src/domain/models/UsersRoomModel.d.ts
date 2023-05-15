import { IEntity } from "domain/shared/IEntity";
export declare class UsersRoomModel implements IEntity {
    user_id?: number;
    socketId?: string;
    equals(entity: IEntity): boolean;
}
