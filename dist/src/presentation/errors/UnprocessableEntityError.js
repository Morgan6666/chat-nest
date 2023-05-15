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
exports.UnprocessableEntityError = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
class UnprocessableEntityError {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The error status.',
        example: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }),
    __metadata("design:type", Number)
], UnprocessableEntityError.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The error validation error.',
        example: [
            {
                property: 'name',
                errors: ['isNotEmpty'],
                constraints: {
                    isNotEmpty: 'name should not be empty',
                },
            },
            {
                property: 'email',
                errors: ['isEmail', 'isNotEmpty'],
                constraints: {
                    isEmail: 'email must be an email',
                    isNotEmpty: 'email should not be empty',
                },
            },
            {
                property: "firstName",
                errors: ["isFirstName", "isNotEmpty"],
                constraints: {
                    isFirstName: "first name must be an first name",
                    isNotEmpty: "first name should not be empty"
                },
            },
            {
                property: "lastName",
                errors: ["isLastName", "isNotEmpty"],
                constraints: {
                    isLastName: "last name should be last name",
                    isNotEmpty: "last name should not be empty"
                }
            }
        ],
    }),
    __metadata("design:type", Array)
], UnprocessableEntityError.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The time of the executed error.',
        example: new Date(),
    }),
    __metadata("design:type", Date)
], UnprocessableEntityError.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The REST path called.',
        example: '/users',
    }),
    __metadata("design:type", String)
], UnprocessableEntityError.prototype, "path", void 0);
exports.UnprocessableEntityError = UnprocessableEntityError;
//# sourceMappingURL=UnprocessableEntityError.js.map