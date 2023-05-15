"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const terminus_1 = require("@nestjs/terminus");
const typeorm_1 = require("@nestjs/typeorm");
const cache_1 = require("./infrastructure/cache");
const environments_1 = require("./infrastructure/environments");
const gateway_module_1 = require("./infrastructure/ioc/gateway.module");
const room_module_1 = require("./infrastructure/ioc/room.module");
const index_1 = require("./infrastructure/terminus/index");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            gateway_module_1.GatewayModule,
            room_module_1.RoomModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                expandVariables: true,
                envFilePath: (0, environments_1.setEnvironment)(),
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: '0.0.0.0',
                port: 5444,
                username: 'morgan',
                password: 'test',
                database: 'messager',
                entities: [__dirname + '/**/common/entities/*.entity{.ts,.js}'],
                synchronize: true,
                logging: true,
                logger: 'file',
            }),
            common_1.CacheModule.registerAsync({
                useClass: cache_1.CacheService,
            }),
            terminus_1.TerminusModule,
        ],
        controllers: [index_1.HealthController],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: common_1.CacheInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map