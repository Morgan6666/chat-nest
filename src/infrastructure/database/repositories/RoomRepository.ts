import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./BaseRepository";
import { RoomModel } from "domain/models/RoomModel";
import { IRoomRepository } from "application/ports/IRoomRepository";
import { InjectConnection } from "@nestjs/typeorm";
import { Connection, Entity } from "typeorm";
import { RoomEntity } from "../mapper/RoomEntity";
import { AddRoomModel } from "domain/models/AddRoomModel";
import { HttpService } from "@nestjs/axios";
import { BASE_HOST, DECODE_TOKEN_URL, GATEWAY_PORT, GET_ARRAY_DOCTOR_INFO, GET_ARRAY_USER_INFO, GET_ID_BY_EMAIL_DOC, GET_ID_BY_EMAIL_USER, POST_DOCTOR_ID_URL_BY_TOKEN, USERS_PORT } from "infrastructure/utils/FetchRequest";
import { Console } from "console";
import { MessageModel } from "domain/models/MessageModel";
import { UserIdModel } from "domain/models/UserIdModel";
import { List } from "lodash";

@Injectable()
export class RoomRepository
  extends BaseRepository<RoomModel>
  implements IRoomRepository
{
  connection: Connection;

  constructor(
    @InjectConnection() connection: Connection,
    private readonly httpService: HttpService
  ) {
    super(connection, RoomEntity);
    this.connection = connection;
  }

  async addUserConnection(
    user_id: number,
    socket_id: string,
    is_doctor: boolean
    
  ) {
    const result = await this.connection.query(
      `INSERT  INTO connected_users(user_id, socket_id, online,is_doctor) VALUES (${user_id},'${socket_id}',true,${is_doctor});`
    );
    return result;
  }
  async updateUserConnection(user_id: number, socket_id: string) {
    const result = await this.connection.query(
      `UPDATE connected_users SET socket_id='${socket_id}' WHERE user_id=${user_id};`
    );
    return result;
  }
  async addUserToRoom(entity: RoomModel) {
    console.log(entity)
    const result = await this.connection.query(
      `INSERT INTO rooms(from_user_id, to_user_id, room_name)
       VALUES((SELECT id FROM connected_users WHERE user_id=${entity.host.user_id}),(SELECT id FROM connected_users WHERE user_id=${entity.to_user_id}),'${entity.roomName}');`
    );
    return result;
  }

  async checkUserInConnection(user_id: number) {
    const result = await this.connection.query(
      `SELECT id FROM connected_users WHERE user_id = ${user_id};`
    );
    if (result.length == 0) {
      return null;
    } else {
      return result;
    }
  }

  async checkUserInRoom(entity: RoomModel) {
    
    const result = await this.connection.query(
      `SELECT id FROM rooms WHERE from_user_id=(SELECT id FROM connected_users WHERE user_id=${entity.host.user_id}) AND to_user_id=(SELECT id FROM connected_users WHERE user_id=${entity.to_user_id});`
    );
    if (result.length == 0) {
      return null;
    } else {
      return result;
    }
  }

  async disconnectUser(user_id: number) {
    const result = await this.connection.query(
      `UPDATE connected_users SET online=false WHERE user_id=${user_id};`
    );
    return result;
  }

  async getRoomUserSocket(roomName: string) {
   
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
    } else {
      return result;
    }
  }

  async getUserIdByToken(token: string) {
    const { data } = await this.httpService.axiosRef.get(
      BASE_HOST.concat(GATEWAY_PORT, DECODE_TOKEN_URL, token)
    );
    if (data.Success != false) {
      return data.Content;
    } else {
      return null;
    }
  }

  async getDoctorIdByToken(token: string) {
    const { data } = await this.httpService.axiosRef.get(
      BASE_HOST.concat(GATEWAY_PORT, POST_DOCTOR_ID_URL_BY_TOKEN, token)
    );
    
    if (data.Success != false) {
      return data.Content;
    } else {
      return null;
    }
  }
  async getDocIdByEmail(email: string){
    const {data} = await this.httpService.axiosRef.post(
      BASE_HOST.concat(USERS_PORT, GET_ID_BY_EMAIL_DOC),
      { email: email }
    )
    if(data.Success != false){
      return data.Content;
    }
    else{
      return null;
    }
  }

  async getUserIdByEmail(email: string) {
    const {data} = await this.httpService.axiosRef.post(
      BASE_HOST.concat(USERS_PORT, GET_ID_BY_EMAIL_USER),
      { email: email }
    )
    if(data.Success != false){
      return data.Content;
    }
    else{
      return null;
    }
    
  }

  async getAllUsersForUser(user_id: number, is_doctor: boolean) {
    
    const result = await this.connection.query(`
    SELECT
      ut.user_id as user_id,
      ut.online as to_online,
      ut.is_doctor
      
    FROM rooms
    INNER JOIN connected_users ut  ON ut.id = rooms.to_user_id
    WHERE rooms.from_user_id = (SELECT id FROM connected_users WHERE user_id=${user_id} AND is_doctor=${is_doctor});`)
    console.log(result);
    if(result.length == 0){
      return null
    }
    else{
      return result;
    }
  }

  async getAllUsersToUser(user_id: number, is_doctor: boolean){
    const result = await this.connection.query(
      `SELECT
      ut.user_id as user_id,
      ut.online as from_online,
      ut.is_doctor
        FROM rooms
        INNER JOIN connected_users ut  ON ut.id = rooms.from_user_id
  WHERE rooms.to_user_id = (SELECT id FROM connected_users WHERE user_id=${user_id} AND is_doctor=${is_doctor});`
    )
    if(result.length == 0){
      return null;
    }
    else{
      return result;
    }
  }

  async getArrayUserInfo(entity: Array<UserIdModel>){
    const { data } = await this.httpService.axiosRef.post(
      BASE_HOST.concat(USERS_PORT,GET_ARRAY_USER_INFO),
      entity
    );
    if (data.Success != false) {
      return data.Content;
    } else {
      return null;
    }
    
  }
  async getArrayDoctorInfo(entity: Array<UserIdModel>){
    const { data } = await this.httpService.axiosRef.post(
      BASE_HOST.concat(USERS_PORT,GET_ARRAY_DOCTOR_INFO),
      entity
    );
    if (data.Success != false) {
      return data.Content;
    } else {
      return null;
    }
    
  }

  
}
