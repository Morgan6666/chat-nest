"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdModel = void 0;
class UserIdModel {
    equals(entity) {
        if (!(entity instanceof UserIdModel))
            return false;
        return this.user_id === entity.user_id;
    }
}
exports.UserIdModel = UserIdModel;
//# sourceMappingURL=UserIdModel.js.map