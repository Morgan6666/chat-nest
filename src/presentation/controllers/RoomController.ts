import { throwStatement } from "@babel/types";
import { Body, Controller, Get, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RoomUseCase } from "application/use-cases/RoomUseCase";
import { AddRoomModel } from "domain/models/AddRoomModel";
import { RoomModel } from "domain/models/RoomModel";
import { Entity } from "typeorm";


@ApiTags('Room')
@Controller('room')
export class RoomController {
    constructor(private readonly roomUsecase: RoomUseCase){}

   
    
}