import { IEntity } from "domain/shared/IEntity";
import { UsersRoomModel } from "./UsersRoomModel";
export declare class AddRoomModel implements IEntity {
    roomName: string;
    host: UsersRoomModel;
    equals(entity: IEntity): boolean;
}
