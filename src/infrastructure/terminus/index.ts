import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('Health Check')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dns: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    const host = this.configService.get<string>('HOST');
    const port = this.configService.get<string>('PORT');
    const urlApi = `http://${host}:${port}`; // TODO: Mudar para DNS

    return this.health.check([
      async () => this.db.pingCheck('database', { timeout: 300 }),
      () => this.dns.pingCheck('api', urlApi),
    ]);
  }
}
