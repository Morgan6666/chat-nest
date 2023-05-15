"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainException = void 0;
class DomainException extends Error {
    constructor(message) {
        super(message);
    }
    alreadyExist() {
        return {
            success: false,
            content: {},
            message: "UserAlreadExists",
            code: 403
        };
    }
}
exports.DomainException = DomainException;
//# sourceMappingURL=DomainException.js.map