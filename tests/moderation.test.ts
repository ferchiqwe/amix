import { MockModerationService } from '@/services/moderation';

describe('MockModerationService', () => {
  const service = new MockModerationService();

  it('allows ordinary coordination inside AMIX', async () => {
    await expect(service.evaluate('Nos vemos en la entrada del café a las 4:30')).resolves.toEqual({
      action: 'allow',
      signals: [],
    });
  });

  it.each(['Escríbeme al 987 654 321', 'Mi Instagram es @amix_demo', 'Hablemos por whats app'])(
    'blocks external contact: %s',
    async (message) => {
      const result = await service.evaluate(message);
      expect(result.action).toBe('block');
      expect(result.signals).toContain('external-contact');
    },
  );

  it('warns about a private first meeting without auto-suspending', async () => {
    const result = await service.evaluate('Mejor ven a mi depa');
    expect(result.action).toBe('warn');
    expect(result.signals).toContain('private-place');
  });

  it('routes a money request to review', async () => {
    const result = await service.evaluate('Hazme un yape y mañana te pago');
    expect(result.action).toBe('review');
    expect(result.signals).toContain('money-request');
  });
});
