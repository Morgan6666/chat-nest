"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEntity = void 0;
const typeorm_1 = require("typeorm");
exports.MessageEntity = new typeorm_1.EntitySchema({
    name: "Message",
    tableName: "message",
    columns: Object.assign(Object.assign({}, typeorm_1.BaseEntity), { room_name: {
            type: String
        } })
});
//# sourceMappingURL=MessageEntity.js.map