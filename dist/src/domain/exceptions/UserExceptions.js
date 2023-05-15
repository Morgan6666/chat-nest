"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExceptions = void 0;
class UserExceptions extends Error {
    alreadyExist() {
        return {
            success: false,
            content: {},
            message: "Пользователь уже существует",
            code: 403
        };
    }
    userNotFound() {
        return {
            success: false,
            content: {},
            message: "Пользователь не найден"
        };
    }
}
exports.UserExceptions = UserExceptions;
//# sourceMappingURL=UserExceptions.js.map