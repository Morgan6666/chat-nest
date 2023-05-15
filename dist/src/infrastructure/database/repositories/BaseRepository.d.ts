import { ObjectLiteral, EntityManager, QueryRunner, EntitySchema, Connection } from 'typeorm';
export declare class BaseRepository<Entity extends ObjectLiteral> {
    readonly manager: EntityManager;
    readonly queryRunner?: QueryRunner;
    readonly entitySchema: EntitySchema<Entity>;
    constructor(connection: Connection, entity: EntitySchema<Entity>);
}
