import { IRoomRepository } from "application/ports/IRoomRepository";
import { RoomModel } from "domain/models/RoomModel";
import { UserIdModel } from "domain/models/UserIdModel";
import { ServiceResponse } from "infrastructure/utils/ServiceResponse";
import Redis from "ioredis";
export declare class RoomUseCase {
    private readonly roomRepo;
    private readonly redis;
    private readonly logger;
    serviceRes: ServiceResponse;
    constructor(roomRepo: IRoomRepository, redis: Redis);
    addUserConnection(user_id: number, socket_id: string, is_doctor: boolean): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
    addConnectionAndVerify(token: string, socket_id: string, is_doctor: string): Promise<any>;
    addUserToRoom(entity: RoomModel): Promise<any>;
    checkUsersInRoom(entity: RoomModel): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
    disconnectAndVerifyUser(token: string, is_doctor: string): Promise<any>;
    disconnectUser(user_id: number): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
    getRoomSocketId(room_name: string): Promise<any[]>;
    getAllUserForUsers(token: string, is_doctor: string): Promise<any>;
    getAllUserFromTo(id: number, is_doctor: boolean): Promise<any>;
    getUserInfo(entity: Array<UserIdModel>, is_doctor: boolean): Promise<any>;
}
