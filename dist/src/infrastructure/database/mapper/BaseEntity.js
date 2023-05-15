"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
exports.BaseEntity = {
    id: {
        type: Number,
        primary: true,
        generated: true,
    },
    createdAt: {
        name: 'created_at',
        type: 'timestamp with time zone',
        createDate: true,
    },
    updatedAt: {
        name: 'updated_at',
        type: 'timestamp with time zone',
        updateDate: true,
    },
};
//# sourceMappingURL=BaseEntity.js.map