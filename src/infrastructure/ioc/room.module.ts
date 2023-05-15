import { Module } from "@nestjs/common";
import { IRoomRepository } from "application/ports/IRoomRepository";
import { RoomUseCase } from "application/use-cases/RoomUseCase";
import { RoomRepository } from "infrastructure/database/repositories/RoomRepository";
import { RoomController } from "presentation/controllers/RoomController";
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
    imports: [
        HttpModule,
        RedisModule.forRoot({
          readyLog: true,
          config: {
            host: 'localhost',
            port: 6379,
          },
        })],
    controllers: [RoomController],
    providers: [
        RoomUseCase,
        {provide:IRoomRepository, useClass: RoomRepository}
    ],
})
export class RoomModule {}