import { IEntity } from "domain/shared/IEntity";
export declare class UserIdModel implements IEntity {
    user_id: number;
    equals(entity: IEntity): boolean;
}
