import { IEntity } from "domain/shared/IEntity";
export declare class CategoriesModel implements IEntity {
    id?: number;
    constructor(id?: number);
    equals(entity: IEntity): boolean;
}
