import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOkResponse({
    description: 'Estado general de la API.',
    schema: {
      type: 'object',
      properties: {
        ok: { type: 'boolean', example: true },
        service: { type: 'string', example: 'api' },
        timestamp: { type: 'string', example: '2026-06-15T12:00:00.000Z' },
      },
    },
  })
  check() {
    return {
      ok: true,
      service: 'api',
      timestamp: new Date().toISOString(),
    };
  }
}
