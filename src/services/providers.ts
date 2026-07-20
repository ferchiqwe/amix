export type VerificationResult = {
  status: 'verified' | 'needs-review';
  checkedAt: string;
  level: 'demo' | 'production';
};

export interface IdentityVerificationProvider {
  start(): Promise<VerificationResult>;
}

export class MockIdentityVerificationProvider implements IdentityVerificationProvider {
  async start(): Promise<VerificationResult> {
    return { status: 'verified', checkedAt: new Date().toISOString(), level: 'demo' };
  }
}

export class FutureProductionIdentityVerificationProvider implements IdentityVerificationProvider {
  async start(): Promise<VerificationResult> {
    throw new Error('El proveedor de identidad de producción todavía no está configurado.');
  }
}

export interface EventCheckInProvider {
  checkIn(eventId: string): Promise<{ eventId: string; status: 'checked-in' }>;
}

export class MockEventCheckInProvider implements EventCheckInProvider {
  async checkIn(eventId: string) {
    return { eventId, status: 'checked-in' as const };
  }
}

export class FutureProductionEventCheckInProvider implements EventCheckInProvider {
  async checkIn(): Promise<never> {
    throw new Error('El check-in de producción todavía no está conectado.');
  }
}

export interface CallProvider {
  start(kind: 'audio' | 'video', conversationId: string): Promise<{ sessionId: string }>;
  end(sessionId: string): Promise<void>;
}

export class MockCallProvider implements CallProvider {
  async start(kind: 'audio' | 'video', conversationId: string) {
    return { sessionId: `demo-${kind}-${conversationId}` };
  }
  async end(): Promise<void> {
    return Promise.resolve();
  }
}

export class FutureLiveKitProvider implements CallProvider {
  async start(): Promise<never> {
    throw new Error('LiveKit todavía no está configurado.');
  }
  async end(): Promise<never> {
    throw new Error('LiveKit todavía no está configurado.');
  }
}

export interface SafetyProvider {
  start(planId: string, expiresAt: string): Promise<{ sessionId: string }>;
  checkIn(sessionId: string): Promise<void>;
  triggerSos(sessionId: string): Promise<void>;
  finish(sessionId: string): Promise<void>;
}

export class MockSafetyProvider implements SafetyProvider {
  async start(planId: string, _expiresAt: string) {
    return { sessionId: `demo-safe-${planId}` };
  }
  async checkIn(): Promise<void> {
    return Promise.resolve();
  }
  async triggerSos(): Promise<void> {
    return Promise.resolve();
  }
  async finish(): Promise<void> {
    return Promise.resolve();
  }
}

export class FutureProductionSafetyProvider implements SafetyProvider {
  private unavailable(): never {
    throw new Error('El proveedor de seguridad de producción todavía no está configurado.');
  }
  async start(): Promise<never> {
    return this.unavailable();
  }
  async checkIn(): Promise<never> {
    return this.unavailable();
  }
  async triggerSos(): Promise<never> {
    return this.unavailable();
  }
  async finish(): Promise<never> {
    return this.unavailable();
  }
}

export type AnalyticsEvent =
  | 'onboarding_started'
  | 'onboarding_completed'
  | 'verification_started'
  | 'verification_completed'
  | 'place_opened'
  | 'place_saved'
  | 'plan_interest_added'
  | 'plan_created'
  | 'event_opened'
  | 'event_application_sent'
  | 'event_checkin_completed'
  | 'review_started'
  | 'review_published'
  | 'safety_mode_started'
  | 'safety_checkin_completed'
  | 'report_submitted'
  | 'user_blocked';

export interface AnalyticsProvider {
  track(event: AnalyticsEvent, safeProperties?: Record<string, string | number | boolean>): void;
}

export class MockAnalyticsProvider implements AnalyticsProvider {
  track(_event: AnalyticsEvent, _safeProperties?: Record<string, string | number | boolean>): void {
    // Intentionally no-op: demo analytics must not collect personal data.
  }
}

export class FutureProductionAnalyticsProvider implements AnalyticsProvider {
  track(_event: AnalyticsEvent, _safeProperties?: Record<string, string | number | boolean>): void {
    throw new Error('La analítica de producción todavía no está configurada.');
  }
}

export const providers = {
  identity: new MockIdentityVerificationProvider(),
  checkIn: new MockEventCheckInProvider(),
  calls: new MockCallProvider(),
  safety: new MockSafetyProvider(),
  analytics: new MockAnalyticsProvider(),
};
