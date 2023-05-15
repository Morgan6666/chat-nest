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
exports.RoomRepository = void 0;
const common_1 = require("@nestjs/common");
const BaseRepository_1 = require("./BaseRepository");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const RoomEntity_1 = require("../mapper/RoomEntity");
const axios_1 = require("@nestjs/axios");
const FetchRequest_1 = require("../../utils/FetchRequest");
let RoomRepository = class RoomRepository extends BaseRepository_1.BaseRepository {
    constructor(connection, httpService) {
        super(connection, RoomEntity_1.RoomEntity);
        this.httpService = httpService;
        this.connection = connection;
    }
    async addUserConnection(user_id, socket_id, is_doctor) {
        const result = await this.connection.query(`INSERT  INTO connected_users(user_id, socket_id, online,is_doctor) VALUES (${user_id},'${socket_id}',true,${is_doctor});`);
        return result;
    }
    async updateUserConnection(user_id, socket_id) {
        const result = await this.connection.query(`UPDATE connected_users SET socket_id='${socket_id}' WHERE user_id=${user_id};`);
        return result;
    }
    async addUserToRoom(entity) {
        console.log(entity);
        const result = await this.connection.query(`INSERT INTO rooms(from_user_id, to_user_id, room_name)
       VALUES((SELECT id FROM connected_users WHERE user_id=${entity.host.user_id}),(SELECT id FROM connected_users WHERE user_id=${entity.to_user_id}),'${entity.roomName}');`);
        return result;
    }
    async checkUserInConnection(user_id) {
        const result = await this.connection.query(`SELECT id FROM connected_users WHERE user_id = ${user_id};`);
        if (result.length == 0) {
            return null;
        }
        else {
            return result;
        }
    }
    async checkUserInRoom(entity) {
        const result = await this.connection.query(`SELECT id FROM rooms WHERE from_user_id=(SELECT id FROM connected_users WHERE user_id=${entity.host.user_id}) AND to_user_id=(SELECT id FROM connected_users WHERE user_id=${entity.to_user_id});`);
        if (result.length == 0) {
            return null;
        }
        else {
            return result;
        }
    }
    async disconnectUser(user_id) {
        const result = await this.connection.query(`UPDATE connected_users SET online=false WHERE user_id=${user_id};`);
        return result;
    }
    async getRoomUserSocket(roomName) {
        const result = await this.connection.query(`
    SELECT 
      uf.socket_id as from_socket,ut.socket_id as to_socket
    FROM rooms
    INNER JOIN connected_users uf ON uf.id = rooms.from_user_id
    INNER JOIN connected_users ut  ON ut.id = rooms.to_user_id
    WHERE rooms.room_name = '${roomName}';`);
        console.log(result);
        if (result.length == 0) {
            return null;
        }
        else {
            return result;
        }
    }
    async getUserIdByToken(token) {
        const { data } = await this.httpService.axiosRef.get(FetchRequest_1.BASE_HOST.concat(FetchRequest_1.GATEWAY_PORT, FetchRequest_1.DECODE_TOKEN_URL, token));
        if (data.Success != false) {
            return data.Content;
        }
        else {
            return null;
        }
    }
    async getDoctorIdByToken(token) {
        const { data } = await this.httpService.axiosRef.get(FetchRequest_1.BASE_HOST.concat(FetchRequest_1.GATEWAY_PORT, FetchRequest_1.POST_DOCTOR_ID_URL_BY_TOKEN, token));
        if (data.Success != false) {
            return data.Content;
        }
        else {
            return null;
        }
    }
    async getDocIdByEmail(email) {
        const { data } = await this.httpService.axiosRef.post(FetchRequest_1.BASE_HOST.concat(FetchRequest_1.USERS_PORT, FetchRequest_1.GET_ID_BY_EMAIL_DOC), { email: email });
        if (data.Success != false) {
            return data.Content;
        }
        else {
            return null;
        }
    }
    async getUserIdByEmail(email) {
        const { data } = await this.httpService.axiosRef.post(FetchRequest_1.BASE_HOST.concat(FetchRequest_1.USERS_PORT, FetchRequest_1.GET_ID_BY_EMAIL_USER), { email: email });
        if (data.Success != false) {
            return data.Content;
        }
        else {
            return null;
        }
    }
    async getAllUsersForUser(user_id, is_doctor) {
        const result = await this.connection.query(`
    SELECT
      ut.user_id as user_id,
      ut.online as to_online,
      ut.is_doctor
      
    FROM rooms
    INNER JOIN connected_users ut  ON ut.id = rooms.to_user_id
    WHERE rooms.from_user_id = (SELECT id FROM connected_users WHERE user_id=${user_id} AND is_doctor=${is_doctor});`);
        console.log(result);
        if (result.length == 0) {
            return null;
        }
        else {
            return result;
        }
    }
    async getAllUsersToUser(user_id, is_doctor) {
        const result = await this.connection.query(`SELECT
      ut.user_id as user_id,
      ut.online as from_online,
      ut.is_doctor
        FROM rooms
        INNER JOIN connected_users ut  ON ut.id = rooms.from_user_id
  WHERE rooms.to_user_id = (SELECT id FROM connected_users WHERE user_id=${user_id} AND is_doctor=${is_doctor});`);
        if (result.length == 0) {
            return null;
        }
        else {
            return result;
        }
    }
    async getArrayUserInfo(entity) {
        const { data } = await this.httpService.axiosRef.post(FetchRequest_1.BASE_HOST.concat(FetchRequest_1.USERS_PORT, FetchRequest_1.GET_ARRAY_USER_INFO), entity);
        if (data.Success != false) {
            return data.Content;
        }
        else {
            return null;
        }
    }
    async getArrayDoctorInfo(entity) {
        const { data } = await this.httpService.axiosRef.post(FetchRequest_1.BASE_HOST.concat(FetchRequest_1.USERS_PORT, FetchRequest_1.GET_ARRAY_DOCTOR_INFO), entity);
        if (data.Success != false) {
            return data.Content;
        }
        else {
            return null;
        }
    }
};
RoomRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Connection,
        axios_1.HttpService])
], RoomRepository);
exports.RoomRepository = RoomRepository;
//# sourceMappingURL=RoomRepository.js.map