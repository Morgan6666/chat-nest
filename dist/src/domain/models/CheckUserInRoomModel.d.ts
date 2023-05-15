import { IEntity } from "domain/shared/IEntity";
import { UsersRoomModel } from "./UsersRoomModel";
export declare class CheckUserInRoomModel implements IEntity {
    roomName: string;
    user: UsersRoomModel;
    equals(entity: IEntity): boolean;
}
