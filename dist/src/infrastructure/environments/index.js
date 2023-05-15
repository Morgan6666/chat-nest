"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setEnvironment = void 0;
function setEnvironment() {
    switch (process.env.NODE_ENV) {
        case 'test':
            return ['.env.test', '.env'];
        case 'stage':
            return ['.env.stage', '.env'];
        case 'development':
            return ['.env.development', '.env'];
        case 'production':
        default:
            return '.env';
    }
}
exports.setEnvironment = setEnvironment;
//# sourceMappingURL=index.js.map