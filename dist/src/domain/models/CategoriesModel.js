"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModel = void 0;
class CategoriesModel {
    constructor(id) {
        this.id = id;
    }
    equals(entity) {
        if (!(entity instanceof CategoriesModel))
            return false;
        return this.id === entity.id;
    }
}
exports.CategoriesModel = CategoriesModel;
//# sourceMappingURL=CategoriesModel.js.map