"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckUserInRoomModel = void 0;
class CheckUserInRoomModel {
    equals(entity) {
        if (!(entity instanceof CheckUserInRoomModel))
            return false;
        return this.user === entity.user;
    }
}
exports.CheckUserInRoomModel = CheckUserInRoomModel;
//# sourceMappingURL=CheckUserInRoomModel.js.map