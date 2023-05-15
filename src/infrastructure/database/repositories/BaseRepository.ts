import {
  ObjectLiteral,
  EntityManager,
  QueryRunner,
  EntitySchema,
  Connection,
} from 'typeorm';

export class BaseRepository<Entity extends ObjectLiteral> {
  readonly manager: EntityManager;
  readonly queryRunner?: QueryRunner;
  readonly entitySchema: EntitySchema<Entity>;

  constructor(connection: Connection, entity: EntitySchema<Entity>) {
    this.queryRunner = connection.createQueryRunner();
    this.manager = this.queryRunner.manager;
    this.entitySchema = entity;
  }


}
