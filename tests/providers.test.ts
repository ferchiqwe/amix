import {
  MockEventCheckInProvider,
  MockIdentityVerificationProvider,
  MockSafetyProvider,
} from '@/services/providers';

describe('demo providers', () => {
  it('marks identity as demo rather than production', async () => {
    const result = await new MockIdentityVerificationProvider().start();
    expect(result).toMatchObject({ status: 'verified', level: 'demo' });
  });

  it('returns a simulated event check-in', async () => {
    await expect(new MockEventCheckInProvider().checkIn('event-1')).resolves.toEqual({
      eventId: 'event-1',
      status: 'checked-in',
    });
  });

  it('creates a clearly demo safety session', async () => {
    await expect(
      new MockSafetyProvider().start('plan-1', new Date().toISOString()),
    ).resolves.toEqual({
      sessionId: 'demo-safe-plan-1',
    });
  });
});
