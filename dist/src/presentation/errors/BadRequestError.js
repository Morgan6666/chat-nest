"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
class BadRequestError {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The error status.',
        example: common_1.HttpStatus.BAD_REQUEST,
    }),
    __metadata("design:type", Number)
], BadRequestError.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The error message.',
        example: 'Unexpected token } in JSON at position 24',
    }),
    __metadata("design:type", String)
], BadRequestError.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The time of the executed error.',
        example: new Date(),
    }),
    __metadata("design:type", Date)
], BadRequestError.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The REST path called.',
        example: '/users',
    }),
    __metadata("design:type", String)
], BadRequestError.prototype, "path", void 0);
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=BadRequestError.js.map