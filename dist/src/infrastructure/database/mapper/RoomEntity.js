"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomEntity = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("./BaseEntity");
exports.RoomEntity = new typeorm_1.EntitySchema({
    name: "Rooms",
    tableName: "room",
    columns: Object.assign(Object.assign({}, BaseEntity_1.BaseEntity), { roomName: {
            type: String
        } })
});
//# sourceMappingURL=RoomEntity.js.map