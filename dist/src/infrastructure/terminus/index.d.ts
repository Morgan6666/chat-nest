import { ConfigService } from '@nestjs/config';
import { HealthCheckService, TypeOrmHealthIndicator, HttpHealthIndicator } from '@nestjs/terminus';
export declare class HealthController {
    private health;
    private dns;
    private db;
    private configService;
    constructor(health: HealthCheckService, dns: HttpHealthIndicator, db: TypeOrmHealthIndicator, configService: ConfigService);
    healthCheck(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
