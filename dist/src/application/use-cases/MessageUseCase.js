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
var MessageUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageUseCase = void 0;
const common_1 = require("@nestjs/common");
const IMessagesRepository_1 = require("../ports/IMessagesRepository");
const IRoomRepository_1 = require("../ports/IRoomRepository");
const ServiceResponse_1 = require("../../infrastructure/utils/ServiceResponse");
let MessageUseCase = MessageUseCase_1 = class MessageUseCase {
    constructor(roomRepo, messageRepo) {
        this.roomRepo = roomRepo;
        this.messageRepo = messageRepo;
        this.logger = new common_1.Logger(MessageUseCase_1.name);
        this.serviceRes = new ServiceResponse_1.ServiceResponse();
    }
    async addMessageRoom(entity) {
        if (entity.is_doctor === 'true') {
            this.logger.log("Верифицируем доктора");
            const data = await this.roomRepo.getDoctorIdByToken(entity.token);
            if (data.id) {
                entity.from_user_id = data.id;
                this.logger.log("Верифицируем пользователя");
                const result = await this.roomRepo.getUserIdByEmail(entity.to_user_email);
                console.log(result);
                if (result[0].id) {
                    this.logger.log(`Пользователь верифицирован`);
                    entity.to_user_id = result[0].id;
                    this.logger.log(`Добавляем сообщение пользователя в комнату`);
                    const data = await this.messageRepo.addMessage(entity);
                    return this.serviceRes.messageSuccessAdded();
                }
                else {
                    this.logger.log(`Пользователь не верифицирован`);
                    return result;
                }
            }
        }
        else {
            this.logger.log(`Верифицируем пользователя`);
            const result = await this.roomRepo.getUserIdByToken(entity.token);
            if (result[0].id) {
                entity.from_user_id = result[0].id;
                this.logger.log(`Верифицируем доктора`);
                const data = await this.roomRepo.getDocIdByEmail(entity.to_user_email);
                if (data[0].id) {
                    this.logger.log(`Доктор верифицирован`);
                    entity.to_user_id = data[0].id;
                    this.logger.log(`Добавляем сообщение пользователя в комнату`);
                    const result = await this.messageRepo.addMessage(entity);
                    return this.serviceRes.messageSuccessAdded();
                }
                else {
                    this.logger.log(`Пользователь не верифицирован`);
                    return data;
                }
            }
        }
    }
    async getAllMessage(entity) {
        this.logger.log(`Получаем данные сообщений комнаты`);
        const result = await this.messageRepo.getAllMessage(entity);
        if (result) {
            this.logger.log(`Сообщения успешно получены`);
            return this.serviceRes.uniqueSuccessRes(result);
        }
        else {
            this.logger.log(`Сообщения не найдены`);
            return this.serviceRes.messagesNotFound();
        }
    }
};
MessageUseCase = MessageUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [IRoomRepository_1.IRoomRepository,
        IMessagesRepository_1.IMessagesRepository])
], MessageUseCase);
exports.MessageUseCase = MessageUseCase;
//# sourceMappingURL=MessageUseCase.js.map