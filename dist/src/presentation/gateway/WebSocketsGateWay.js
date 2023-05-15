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
var AppGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const MessageUseCase_1 = require("../../application/use-cases/MessageUseCase");
const RoomUseCase_1 = require("../../application/use-cases/RoomUseCase");
const MessageModel_1 = require("../../domain/models/MessageModel");
const RoomModel_1 = require("../../domain/models/RoomModel");
const socket_io_1 = require("socket.io");
let AppGateway = AppGateway_1 = class AppGateway {
    constructor(roomUsecase, messageUseCase) {
        this.roomUsecase = roomUsecase;
        this.messageUseCase = messageUseCase;
        this.logger = new common_1.Logger(AppGateway_1.name);
    }
    async handleChatEvent(socket, payload) {
        this.logger.log(`Добавляем сообщение пользователя`);
        payload.is_doctor = String(socket.handshake.query.is_doctors);
        payload.token = String(socket.handshake.query.token);
        const message = await this.messageUseCase.addMessageRoom(payload);
        this.logger.log(`Получаем данные соккетов комнаты`);
        const result = await this.roomUsecase.getRoomSocketId(payload.room_name);
        this.logger.log(`Сообщения получены`);
        for (let k = 0; k < result.length; k++) {
            this.server.to(result[k]).emit("receive_message", payload.message);
        }
    }
    async getAllMessage(socket, payload) {
        this.logger.log(`Получаем данные сообщений`);
        const message = await this.messageUseCase.getAllMessage(payload);
        this.logger.log(`Получаем данные сокетов`);
        const result = await this.roomUsecase.getRoomSocketId(payload.room_name);
        for (let k = 0; k < result.length; k++) {
            this.server.to(result[k]).emit("receive_message", message);
        }
    }
    async getOnlineUser(socket) {
        this.logger.log(`Получаем информацию о пользователях`);
        const token = String(socket.handshake.query.token);
        const is_doc = String(socket.handshake.query.is_doctors);
        const users = await this.roomUsecase.getAllUserForUsers(token, is_doc);
        this.server.emit("receive_users", users);
    }
    async handleSetClientDataEvent(client, payload) {
        this.logger.log(`Создаём комнату`);
        console.log(client.id);
        payload.host.socketId = client.id;
        payload.token = String(client.handshake.query.token);
        payload.is_doctor = String(client.handshake.query.is_doctors);
        const result = await this.roomUsecase.addUserToRoom(payload);
        return result;
    }
    async afterInit(server) {
        this.logger.log(" Server is init");
    }
    async handleDisconnect(client) {
        this.logger.log(`Пользователь отключается:${client.id}`);
        await this.roomUsecase.disconnectAndVerifyUser(String(client.handshake.query.token), String(client.handshake.query.is_doctors));
    }
    async handleConnection(client) {
        this.logger.log(`Пользователь:${client.id} подключился`);
        await this.roomUsecase.addConnectionAndVerify(String(client.handshake.query.token), client.id, String(client.handshake.query.is_doctors));
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("send_message"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, MessageModel_1.MessageModel]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleChatEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("get_all_messages"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, MessageModel_1.MessageModel]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "getAllMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("get_online_user"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "getOnlineUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join_room'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, RoomModel_1.RoomModel]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleSetClientDataEvent", null);
AppGateway = AppGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [RoomUseCase_1.RoomUseCase, MessageUseCase_1.MessageUseCase])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=WebSocketsGateWay.js.map