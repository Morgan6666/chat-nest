import { IEntity } from "domain/shared/IEntity";


export class UserIdModel implements IEntity {
    user_id: number;
    equals(entity: IEntity): boolean {
        if (!(entity instanceof UserIdModel)) return false;
        return this.user_id === entity.user_id;
      }
}