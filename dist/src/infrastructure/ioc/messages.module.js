"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const IMessagesRepository_1 = require("../../application/ports/IMessagesRepository");
const MessageUseCase_1 = require("../../application/use-cases/MessageUseCase");
const MessageRepository_1 = require("../database/repositories/MessageRepository");
const axios_1 = require("@nestjs/axios");
const room_module_1 = require("./room.module");
const RoomUseCase_1 = require("../../application/use-cases/RoomUseCase");
const IRoomRepository_1 = require("../../application/ports/IRoomRepository");
const RoomRepository_1 = require("../database/repositories/RoomRepository");
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, room_module_1.RoomModule],
        controllers: [],
        providers: [
            MessageUseCase_1.MessageUseCase,
            { provide: IMessagesRepository_1.IMessagesRepository, useClass: MessageRepository_1.MessageRepository },
            RoomUseCase_1.RoomUseCase,
            { provide: IRoomRepository_1.IRoomRepository, useClass: RoomRepository_1.RoomRepository }
        ]
    })
], MessageModule);
exports.MessageModule = MessageModule;
//# sourceMappingURL=messages.module.js.map