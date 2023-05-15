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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var RoomUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomUseCase = void 0;
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const common_1 = require("@nestjs/common");
const IRoomRepository_1 = require("../ports/IRoomRepository");
const ServiceResponse_1 = require("../../infrastructure/utils/ServiceResponse");
const ioredis_1 = __importDefault(require("ioredis"));
let RoomUseCase = RoomUseCase_1 = class RoomUseCase {
    constructor(roomRepo, redis) {
        this.roomRepo = roomRepo;
        this.redis = redis;
        this.logger = new common_1.Logger(RoomUseCase_1.name);
        this.serviceRes = new ServiceResponse_1.ServiceResponse();
    }
    async addUserConnection(user_id, socket_id, is_doctor) {
        this.logger.log(`Проверяем наличие пользователя в таблице подключений`);
        const checkUser = await this.roomRepo.checkUserInConnection(user_id);
        if (checkUser) {
            this.logger.log("Обновляем сокет");
            const result = await this.roomRepo.updateUserConnection(user_id, socket_id);
            return this.serviceRes.socketSuccessUpdated();
        }
        else {
            this.logger.log(`Добавляем пользователя в таблицу подключений`);
            const result = await this.roomRepo.addUserConnection(user_id, socket_id, is_doctor);
            return this.serviceRes.userSuccessfulyCreated();
        }
    }
    async addConnectionAndVerify(token, socket_id, is_doctor) {
        console.log(is_doctor);
        if (is_doctor === "true") {
            this.logger.log(`Верифицируем врача`);
            const data = await this.roomRepo.getDoctorIdByToken(token);
            if (data.id) {
                this.logger.log(`Врач успешно верифицирован`);
                const conn = await this.addUserConnection(data.id, socket_id, true);
                return conn;
            }
            else {
                this.logger.log(`Врач не верифицирован`);
                return data;
            }
        }
        else {
            console.log(`User doc:${is_doctor}`);
            this.logger.log(`Верифицируем пользователя`);
            const user = await this.roomRepo.getUserIdByToken(token);
            console.log(user);
            if (user[0].id) {
                this.logger.log(`Пользователь верифицирован`);
                const result = await this.addUserConnection(user[0].id, socket_id, false);
                return result;
            }
            else {
                this.logger.log(`Пользователь не верифицирован`);
                return user;
            }
        }
    }
    async addUserToRoom(entity) {
        console.log(entity);
        if (entity.is_doctor === "true") {
            this.logger.log("Верифицируем доктора");
            const data = await this.roomRepo.getDoctorIdByToken(entity.token);
            if (data.id) {
                entity.host.user_id = data.id;
                this.logger.log("Верифицируем пользователя");
                const result = await this.roomRepo.getUserIdByEmail(entity.to_user_email);
                console.log(result);
                if (result[0].id) {
                    this.logger.log(`Пользователь верифицирован`);
                    entity.to_user_id = result[0].id;
                    this.logger.log(`Добавляем пользователей в комнату`);
                    const room = await this.checkUsersInRoom(entity);
                    return room;
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
                entity.host.user_id = result[0].id;
                this.logger.log(`Верифицируем доктора`);
                const data = await this.roomRepo.getDocIdByEmail(entity.to_user_email);
                if (data[0].id) {
                    this.logger.log(`Доктор верифицирован`);
                    entity.to_user_id = data[0].id;
                    this.logger.log(`ДОбавляем пользователей в комнату`);
                    const room = await this.checkUsersInRoom(entity);
                    return room;
                }
                else {
                    this.logger.log(`Пользователь не верифицирован`);
                    return data;
                }
            }
        }
    }
    async checkUsersInRoom(entity) {
        this.logger.log(`Проверяем существование комнаты`);
        const result = await this.roomRepo.checkUserInRoom(entity);
        if (result) {
            this.logger.log(`Обновляем socket-id пользователя from`);
            const result = await this.roomRepo.updateUserConnection(entity.host.user_id, entity.host.socketId);
            return this.serviceRes.socketSuccessUpdated();
        }
        else {
            this.logger.log("Комната не существует.Добавляем пользователей в комнату");
            let r = (Math.random() + 1).toString(36).substring(7);
            entity.roomName = r;
            console.log(entity);
            const resutl = await this.roomRepo.addUserToRoom(entity);
            return this.serviceRes.uniqueSuccessRes({ room_name: r });
        }
    }
    async disconnectAndVerifyUser(token, is_doctor) {
        if (is_doctor === "true") {
            this.logger.log(`Верифицируем доктора`);
            const doctor = await this.roomRepo.getDoctorIdByToken(token);
            if (doctor.id) {
                this.logger.log(`Доктор верифицирован`);
                const dis = await this.disconnectUser(doctor.id);
                return dis;
            }
            else {
                this.logger.log(`Доктор не верифицирован`);
                return doctor;
            }
        }
        else {
            this.logger.log(`Верифицируем пользователя`);
            const user = await this.roomRepo.getUserIdByToken(token);
            if (user[0].id) {
                this.logger.log(`Пользователь верифицирован`);
                const result = await this.disconnectUser(user[0].id);
                return result;
            }
            else {
                this.logger.log(`Пользователь не верифицирован`);
                return user;
            }
        }
    }
    async disconnectUser(user_id) {
        this.logger.log(`Обновляем статус пользователя`);
        const result = await this.roomRepo.disconnectUser(user_id);
        return this.serviceRes.userDisconnect();
    }
    async getRoomSocketId(room_name) {
        this.logger.log(`Получаем данные сокета пользователей`);
        const result = await this.roomRepo.getRoomUserSocket(room_name);
        const socket_arr = [];
        if (result) {
            this.logger.log(`Данные по соккетам получены`);
            for (let i = 0; i < result.length; i++) {
                socket_arr.push(result[i].from_socket);
                socket_arr.push(result[i].to_socket);
            }
            return socket_arr;
        }
        else {
            this.logger.log(`Соккеты не получены`);
            return socket_arr;
        }
    }
    async getAllUserForUsers(token, is_doctor) {
        if (is_doctor === "true") {
            this.logger.log(`Верифицируем доктора`);
            const doctor = await this.roomRepo.getDoctorIdByToken(token);
            if (doctor.id) {
                this.logger.log(`Доктор верифицирован`);
                const result = await this.getAllUserFromTo(doctor.id, true);
                return result;
            }
            else {
                this.logger.log(`Доктор не верифицирован`);
                return doctor;
            }
        }
        else {
            this.logger.log(`Верифицируем пользователя`);
            const user = await this.roomRepo.getUserIdByToken(token);
            if (user[0].id) {
                this.logger.log(`Пользователь верифицирован`);
                const result = await this.getAllUserFromTo(user[0].id, false);
            }
            else {
                this.logger.log(`Пользователь не верифицирован`);
                return user;
            }
        }
    }
    async getAllUserFromTo(id, is_doctor) {
        this.logger.log(`Верифицируем пользователя`);
        this.logger.log(`Пользователь верифицирован`);
        const result = await this.roomRepo.getAllUsersForUser(id, is_doctor);
        if (result) {
            this.logger.log(``);
            return this.serviceRes.uniqueSuccessRes(result);
        }
        else {
            this.logger.log(`Проверям пользователей to`);
            const data = await this.roomRepo.getAllUsersToUser(id, is_doctor);
            if (data) {
                const result = await this.getUserInfo(data, is_doctor);
                return result;
            }
            else {
                this.logger.log(`Пользователи не найдены`);
                return this.serviceRes.userDoesntExistInRoom();
            }
        }
    }
    async getUserInfo(entity, is_doctor) {
        if (is_doctor) {
            this.logger.log(`Получаем данные доктора`);
            const doc = await this.roomRepo.getArrayDoctorInfo(entity);
            if (doc) {
                this.logger.log(`Данные доктора получены`);
                return this.serviceRes.uniqueSuccessRes(doc);
            }
            else {
                this.logger.log(`Данные доктора не получены`);
                return doc;
            }
        }
        else {
            this.logger.log(`Получаем данные пользователя`);
            const user = await this.roomRepo.getArrayUserInfo(entity);
            if (user) {
                this.logger.log("Данные пользователя получены");
                return this.serviceRes.uniqueSuccessRes(user);
            }
            else {
                this.logger.log("Данные пользователя  не получены");
                return user;
            }
        }
    }
};
RoomUseCase = RoomUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, nestjs_redis_1.InjectRedis)()),
    __metadata("design:paramtypes", [IRoomRepository_1.IRoomRepository,
        ioredis_1.default])
], RoomUseCase);
exports.RoomUseCase = RoomUseCase;
//# sourceMappingURL=RoomUseCase.js.map