import { Injectable } from "@nestjs/common";


@Injectable()
export abstract class IMessages<Entity>{
    abstract addMessage(entity: Entity);
    abstract getAllMessage(entity: Entity);
    
    
    
}