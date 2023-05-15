import { BaseRepository } from "./BaseRepository";
import { RoomModel } from "domain/models/RoomModel";
import { IRoomRepository } from "application/ports/IRoomRepository";
import { Connection } from "typeorm";
import { HttpService } from "@nestjs/axios";
import { UserIdModel } from "domain/models/UserIdModel";
export declare class RoomRepository extends BaseRepository<RoomModel> implements IRoomRepository {
    private readonly httpService;
    connection: Connection;
    constructor(connection: Connection, httpService: HttpService);
    addUserConnection(user_id: number, socket_id: string, is_doctor: boolean): Promise<any>;
    updateUserConnection(user_id: number, socket_id: string): Promise<any>;
    addUserToRoom(entity: RoomModel): Promise<any>;
    checkUserInConnection(user_id: number): Promise<any>;
    checkUserInRoom(entity: RoomModel): Promise<any>;
    disconnectUser(user_id: number): Promise<any>;
    getRoomUserSocket(roomName: string): Promise<any>;
    getUserIdByToken(token: string): Promise<any>;
    getDoctorIdByToken(token: string): Promise<any>;
    getDocIdByEmail(email: string): Promise<any>;
    getUserIdByEmail(email: string): Promise<any>;
    getAllUsersForUser(user_id: number, is_doctor: boolean): Promise<any>;
    getAllUsersToUser(user_id: number, is_doctor: boolean): Promise<any>;
    getArrayUserInfo(entity: Array<UserIdModel>): Promise<any>;
    getArrayDoctorInfo(entity: Array<UserIdModel>): Promise<any>;
}
