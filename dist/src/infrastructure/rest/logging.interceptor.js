"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const chalk_1 = __importDefault(require("chalk"));
const operators_1 = require("rxjs/operators");
let LoggingInterceptor = class LoggingInterceptor {
    intercept(context, next) {
        const parentType = chalk_1.default
            .hex('#87e8de')
            .bold(`${context.getArgs()[0].route.path}`);
        const fieldName = chalk_1.default
            .hex('#87e8de')
            .bold(`${context.getArgs()[0].route.stack[0].method}`);
        return next.handle().pipe((0, operators_1.tap)(() => {
            common_1.Logger.debug(`⛩  ${parentType} » ${fieldName}`, 'RESTful');
        }));
    }
};
LoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=logging.interceptor.js.map