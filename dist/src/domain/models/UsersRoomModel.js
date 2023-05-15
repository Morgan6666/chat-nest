"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoomModel = void 0;
class UsersRoomModel {
    equals(entity) {
        if (!(entity instanceof UsersRoomModel))
            return false;
        return this.user_id === entity.user_id;
    }
}
exports.UsersRoomModel = UsersRoomModel;
//# sourceMappingURL=UsersRoomModel.js.map