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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepository = void 0;
const common_1 = require("@nestjs/common");
const BaseRepository_1 = require("./BaseRepository");
const typeorm_1 = require("typeorm");
const MessageEntity_1 = require("../mapper/MessageEntity");
const typeorm_2 = require("@nestjs/typeorm");
const axios_1 = require("@nestjs/axios");
let MessageRepository = class MessageRepository extends BaseRepository_1.BaseRepository {
    constructor(connection, httpService) {
        super(connection, MessageEntity_1.MessageEntity);
        this.httpService = httpService;
        this.connection = connection;
    }
    async addMessage(entity) {
        console.log(`INSERT INTO messages(time_sent, time_update, message, room_id) VALUES(now(), now(), '${entity.message}', (SELECT id FROM rooms WHERE room_name='${entity.room_name}'));`);
        const result = await this.connection.query(`INSERT INTO messages(time_sent, time_update, message, room_id) VALUES(now(), now(), '${entity.message}', (SELECT id FROM rooms WHERE room_name='${entity.room_name}'));`);
        return result;
    }
    async getAllMessage(entity) {
        const result = await this.connection.query(`SELECT message FROM messages WHERE room_id =(SELECT id FROM rooms WHERE room_name='${entity.room_name}');`);
        if (result.length == 0) {
            return null;
        }
        else {
            return result;
        }
    }
};
MessageRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_1.Connection, axios_1.HttpService])
], MessageRepository);
exports.MessageRepository = MessageRepository;
//# sourceMappingURL=MessageRepository.js.map