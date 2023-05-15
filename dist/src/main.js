"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const body_parser_1 = __importDefault(require("body-parser"));
const chalk_1 = __importDefault(require("chalk"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const http_exception_filter_1 = require("./infrastructure/rest/http-exception.filter");
const logging_interceptor_1 = require("./infrastructure/rest/logging.interceptor");
const validation_pipe_1 = require("./infrastructure/rest/validation.pipe");
const app_module_1 = require("./app.module");
async function bootstrap() {
    var _a;
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, {
            cors: true,
        });
        const configService = app.get(config_1.ConfigService);
        common_1.Logger.log(`Environment: ${chalk_1.default
            .hex('#87e8de')
            .bold(`${(_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toUpperCase()}`)}`, 'Bootstrap');
        app.use((0, helmet_1.default)());
        app.use((0, compression_1.default)());
        app.use(body_parser_1.default.json({ limit: '50mb' }));
        app.use(body_parser_1.default.urlencoded({
            limit: '50mb',
            extended: true,
            parameterLimit: 50000,
        }));
        app.use((0, express_rate_limit_1.default)({
            windowMs: 1000 * 60 * 60,
            max: 1000,
            message: '⚠️  Too many request created from this IP, please try again after an hour',
        }));
        app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
        app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
        app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
        const APP_NAME = configService.get('APP_NAME');
        const APP_DESCRIPTION = configService.get('APP_DESCRIPTION');
        const API_VERSION = configService.get('API_VERSION', 'v1');
        const options = new swagger_1.DocumentBuilder()
            .setTitle(APP_NAME)
            .setDescription(APP_DESCRIPTION)
            .setVersion(API_VERSION)
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('api', app, document);
        swagger_1.SwaggerModule.setup('/', app, document);
        common_1.Logger.log('Mapped {/, GET} Swagger api route', 'RouterExplorer');
        common_1.Logger.log('Mapped {/api, GET} Swagger api route', 'RouterExplorer');
        const HOST = configService.get('HOST', 'localhost');
        const PORT = configService.get('PORT', '3011');
        await app.listen(PORT);
        process.env.NODE_ENV !== 'production'
            ? common_1.Logger.log(`🚀  Server ready at http://${HOST}:${chalk_1.default
                .hex('#87e8de')
                .bold(`${PORT}`)}`, 'Bootstrap', false)
            : common_1.Logger.log(`🚀  Server is listening on port ${chalk_1.default
                .hex('#87e8de')
                .bold(`${PORT}`)}`, 'Bootstrap', false);
        if (module.hot) {
            module.hot.accept();
            module.hot.dispose(() => app.close());
        }
    }
    catch (error) {
        common_1.Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
        process.exit();
    }
}
bootstrap().catch(e => {
    common_1.Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false);
    throw e;
});
//# sourceMappingURL=main.js.map