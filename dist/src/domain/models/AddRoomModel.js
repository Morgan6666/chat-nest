"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRoomModel = void 0;
class AddRoomModel {
    equals(entity) {
        if (!(entity instanceof AddRoomModel))
            return false;
        return this.roomName === entity.roomName;
    }
}
exports.AddRoomModel = AddRoomModel;
//# sourceMappingURL=AddRoomModel.js.map