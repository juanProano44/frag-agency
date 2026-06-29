import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('returns ok status', () => {
    const controller = new HealthController();
    const result = controller.check();

    expect(result.ok).toBe(true);
    expect(result.service).toBe('api');
  });
});
