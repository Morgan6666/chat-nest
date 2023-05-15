import { Injectable } from "@nestjs/common";
import { RoomModel } from "domain/models/RoomModel";
import { IRoom } from "./IRoom";


@Injectable()
export abstract class IRoomRepository extends IRoom<RoomModel>{}