import { Injectable } from "@nestjs/common";
import { MessageModel } from "domain/models/MessageModel";
import { IMessages } from "./IMessages";

@Injectable()
export abstract class IMessagesRepository extends IMessages<MessageModel>{}