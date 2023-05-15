import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class IRoom<Entity> {
  abstract addUserConnection(user_id: number, socket_id: string, is_doctor: boolean);
  abstract updateUserConnection(user_id: number, socket_id: string);
  abstract addUserToRoom(entity: Entity);
  abstract checkUserInConnection(user_id: number);
  abstract checkUserInRoom(entity: Entity);
  abstract disconnectUser(user_id: number);
  abstract getRoomUserSocket(roomName: string);
  abstract getUserIdByToken(token: string);
  abstract getDoctorIdByToken(token: string);
  abstract getDocIdByEmail(email: string);
  abstract getUserIdByEmail(email: string);
  abstract getAllUsersForUser(user_id: number, is_doctor: boolean);
  abstract getAllUsersToUser(user_id: number, is_doctor: boolean);
  abstract getArrayUserInfo(entity: Array<Entity>)
  abstract getArrayDoctorInfo(entity: Array<Entity>)
  
}
