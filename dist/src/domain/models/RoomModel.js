"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModel = void 0;
class RoomModel {
    equals(entity) {
        if (!(entity instanceof RoomModel))
            return false;
        return this.roomName === entity.roomName;
    }
}
exports.RoomModel = RoomModel;
//# sourceMappingURL=RoomModel.js.map