import { InjectRedis } from "@liaoliaots/nestjs-redis";
import { Injectable, Logger } from "@nestjs/common";
import { IRoomRepository } from "application/ports/IRoomRepository";
import e from "cors";
import { AddRoomModel } from "domain/models/AddRoomModel";
import { MessageModel } from "domain/models/MessageModel";
import { RoomModel } from "domain/models/RoomModel";
import { UserIdModel } from "domain/models/UserIdModel";
import { ESLint } from "eslint";
import { ServiceResponse } from "infrastructure/utils/ServiceResponse";
import Redis from "ioredis";
import { result } from "lodash";
import { check, doc } from "prettier";
import { Touchscreen } from "puppeteer";
import { elementAt, ignoreElements } from "rxjs";
import { runInThisContext } from "vm";

@Injectable()
export class RoomUseCase {
  private readonly logger = new Logger(RoomUseCase.name);
  public serviceRes = new ServiceResponse();
  constructor(
    private readonly roomRepo: IRoomRepository,
    @InjectRedis() private readonly redis: Redis
  ) {}

  async addUserConnection(
    user_id: number,
    socket_id: string,
    is_doctor: boolean
  ) {
    this.logger.log(`Проверяем наличие пользователя в таблице подключений`);
    const checkUser = await this.roomRepo.checkUserInConnection(user_id);
    if (checkUser) {
      this.logger.log("Обновляем сокет");
      const result = await this.roomRepo.updateUserConnection(
        user_id,
        socket_id
      );
      return this.serviceRes.socketSuccessUpdated();
    } else {
      this.logger.log(`Добавляем пользователя в таблицу подключений`);
      const result = await this.roomRepo.addUserConnection(
        user_id,
        socket_id,
        is_doctor
      );
      return this.serviceRes.userSuccessfulyCreated();
    }
  }

  async addConnectionAndVerify(
    token: string,
    socket_id: string,
    is_doctor: string
  ) {
    console.log(is_doctor);
    if (is_doctor === "true") {
      this.logger.log(`Верифицируем врача`);
      const data = await this.roomRepo.getDoctorIdByToken(token);
      if (data.id) {
        this.logger.log(`Врач успешно верифицирован`);
        const conn = await this.addUserConnection(data.id, socket_id, true);
        return conn;
      } else {
        this.logger.log(`Врач не верифицирован`);
        return data;
      }
    } else {
      console.log(`User doc:${is_doctor}`);
      this.logger.log(`Верифицируем пользователя`);
      const user = await this.roomRepo.getUserIdByToken(token);
      console.log(user);
      if (user[0].id) {
        this.logger.log(`Пользователь верифицирован`);
        const result = await this.addUserConnection(
          user[0].id,
          socket_id,
          false
        );
        return result;
      } else {
        this.logger.log(`Пользователь не верифицирован`);
        return user;
      }
    }
  }

  async addUserToRoom(entity: RoomModel) {
    console.log(entity);
    if (entity.is_doctor === "true") {
      this.logger.log("Верифицируем доктора");
      const data = await this.roomRepo.getDoctorIdByToken(entity.token);
      if (data.id) {
        entity.host.user_id = data.id;
        this.logger.log("Верифицируем пользователя");
        const result = await this.roomRepo.getUserIdByEmail(
          entity.to_user_email
        );
        console.log(result);
        if (result[0].id) {
          this.logger.log(`Пользователь верифицирован`);
          entity.to_user_id = result[0].id;
          this.logger.log(`Добавляем пользователей в комнату`);
          const room = await this.checkUsersInRoom(entity);
          return room;
        } else {
          this.logger.log(`Пользователь не верифицирован`);
          return result;
        }
      }
    } else {
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
        } else {
          this.logger.log(`Пользователь не верифицирован`);
          return data;
        }
      }
    }
  }

  async checkUsersInRoom(entity: RoomModel) {
    this.logger.log(`Проверяем существование комнаты`);
    const result = await this.roomRepo.checkUserInRoom(entity);
    if (result) {
      this.logger.log(`Обновляем socket-id пользователя from`);
      const result = await this.roomRepo.updateUserConnection(
        entity.host.user_id,
        entity.host.socketId
      );
      return this.serviceRes.socketSuccessUpdated();
    } else {
      this.logger.log(
        "Комната не существует.Добавляем пользователей в комнату"
      );
      let r = (Math.random() + 1).toString(36).substring(7);
      entity.roomName = r;
      console.log(entity);
      const resutl = await this.roomRepo.addUserToRoom(entity);
      return this.serviceRes.uniqueSuccessRes({ room_name: r });
    }
  }

  async disconnectAndVerifyUser(token: string, is_doctor: string) {
    if (is_doctor === "true") {
      this.logger.log(`Верифицируем доктора`);
      const doctor = await this.roomRepo.getDoctorIdByToken(token);
      if (doctor.id) {
        this.logger.log(`Доктор верифицирован`);
        const dis = await this.disconnectUser(doctor.id);
        return dis;
      } else {
        this.logger.log(`Доктор не верифицирован`);
        return doctor;
      }
    } else {
      this.logger.log(`Верифицируем пользователя`);
      const user = await this.roomRepo.getUserIdByToken(token);
      if (user[0].id) {
        this.logger.log(`Пользователь верифицирован`);
        const result = await this.disconnectUser(user[0].id);
        return result;
      } else {
        this.logger.log(`Пользователь не верифицирован`);
        return user;
      }
    }
  }

  async disconnectUser(user_id: number) {
    this.logger.log(`Обновляем статус пользователя`);
    const result = await this.roomRepo.disconnectUser(user_id);
    return this.serviceRes.userDisconnect();
  }

  async getRoomSocketId(room_name: string) {
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
    } else {
      this.logger.log(`Соккеты не получены`);
      return socket_arr;
    }
  }

  async getAllUserForUsers(token: string, is_doctor: string) {
    if (is_doctor === "true") {
      this.logger.log(`Верифицируем доктора`);
      const doctor = await this.roomRepo.getDoctorIdByToken(token);
      if (doctor.id) {
        this.logger.log(`Доктор верифицирован`);
        const result = await this.getAllUserFromTo(doctor.id, true);
        return result;
      } else {
        this.logger.log(`Доктор не верифицирован`);
        return doctor;
      }
    } else {
      this.logger.log(`Верифицируем пользователя`);
      const user = await this.roomRepo.getUserIdByToken(token);
      if (user[0].id) {
        this.logger.log(`Пользователь верифицирован`);
        const result = await this.getAllUserFromTo(user[0].id, false);
      } else {
        this.logger.log(`Пользователь не верифицирован`);
        return user;
      }
    }
  }

  async getAllUserFromTo(id: number, is_doctor: boolean) {
    this.logger.log(`Верифицируем пользователя`);

    this.logger.log(`Пользователь верифицирован`);
    const result = await this.roomRepo.getAllUsersForUser(id, is_doctor);
    if (result) {
      this.logger.log(``);
      return this.serviceRes.uniqueSuccessRes(result);
    } else {
      this.logger.log(`Проверям пользователей to`);
      const data = await this.roomRepo.getAllUsersToUser(id, is_doctor);
      if (data) {
        const result = await this.getUserInfo(data, is_doctor);
        return result;
      } else {
        this.logger.log(`Пользователи не найдены`);
        return this.serviceRes.userDoesntExistInRoom();
      }
    }
  }
  async getUserInfo(entity: Array<UserIdModel>, is_doctor: boolean) {
    if (is_doctor) {
      this.logger.log(`Получаем данные доктора`);
      const doc = await this.roomRepo.getArrayDoctorInfo(entity);
      if (doc) {
        this.logger.log(`Данные доктора получены`);
        return this.serviceRes.uniqueSuccessRes(doc);
      } else {
        this.logger.log(`Данные доктора не получены`);
        return doc;
      }
    } else {
      this.logger.log(`Получаем данные пользователя`);
      const user = await this.roomRepo.getArrayUserInfo(entity);
      if (user) {
        this.logger.log("Данные пользователя получены");
        return this.serviceRes.uniqueSuccessRes(user);
      } else {
        this.logger.log("Данные пользователя  не получены");
        return user;
      }
    }
  }
}
