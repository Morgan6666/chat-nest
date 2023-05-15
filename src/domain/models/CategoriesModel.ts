import { IEntity } from "domain/shared/IEntity";

export class CategoriesModel implements IEntity {
    id?: number;
    constructor(id?: number){
        this.id = id
    }
    equals(entity: IEntity): boolean {
        if (!(entity instanceof CategoriesModel)) return false;
        return this.id === entity.id;
      }
    
}