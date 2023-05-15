import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CacheService } from 'infrastructure/cache';
import { setEnvironment } from 'infrastructure/environments';
import { GatewayModule } from 'infrastructure/ioc/gateway.module';
import { RoomModule } from 'infrastructure/ioc/room.module';
import { HealthController } from 'infrastructure/terminus/index';

@Module({
  imports: [
    
    GatewayModule,
    RoomModule,

    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '0.0.0.0',
      port: 5444,
      username: 'morgan',
      password: 'test',
      database: 'messager',
      entities: [__dirname + '/**/common/entities/*.entity{.ts,.js}'],
      // entities: [UserEntity],
      synchronize: true,
      logging: true,
      logger: 'file',
    }),
    CacheModule.registerAsync({
      useClass: CacheService,
    }),
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
