"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(connection, entity) {
        this.queryRunner = connection.createQueryRunner();
        this.manager = this.queryRunner.manager;
        this.entitySchema = entity;
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map