export declare abstract class IRoom<Entity> {
    abstract addUserConnection(user_id: number, socket_id: string, is_doctor: boolean): any;
    abstract updateUserConnection(user_id: number, socket_id: string): any;
    abstract addUserToRoom(entity: Entity): any;
    abstract checkUserInConnection(user_id: number): any;
    abstract checkUserInRoom(entity: Entity): any;
    abstract disconnectUser(user_id: number): any;
    abstract getRoomUserSocket(roomName: string): any;
    abstract getUserIdByToken(token: string): any;
    abstract getDoctorIdByToken(token: string): any;
    abstract getDocIdByEmail(email: string): any;
    abstract getUserIdByEmail(email: string): any;
    abstract getAllUsersForUser(user_id: number, is_doctor: boolean): any;
    abstract getAllUsersToUser(user_id: number, is_doctor: boolean): any;
    abstract getArrayUserInfo(entity: Array<Entity>): any;
    abstract getArrayDoctorInfo(entity: Array<Entity>): any;
}
