"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
class MessageModel {
    equals(entity) {
        if (!(entity instanceof MessageModel))
            return false;
        return this.from_user_id === entity.to_user_id;
    }
}
exports.MessageModel = MessageModel;
//# sourceMappingURL=MessageModel.js.map