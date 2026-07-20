export type ModerationSignal =
  'external-contact' | 'money-request' | 'private-place' | 'risky-opportunity' | 'threat';

export type ModerationDecision = {
  action: 'allow' | 'warn' | 'block' | 'review';
  signals: ModerationSignal[];
  message?: string;
};

export interface ModerationService {
  evaluate(message: string): Promise<ModerationDecision>;
}

const RULES: { signal: ModerationSignal; pattern: RegExp }[] = [
  {
    signal: 'external-contact',
    pattern:
      /(whats\s*app|telegram|instagram|insta\b|tiktok|discord|arroba|@|https?:|www\.|\b\d[\d\s().-]{7,}\d\b|\b[\w.+-]+\s*(?:@|arroba)\s*[\w.-]+\b)/i,
  },
  {
    signal: 'money-request',
    pattern: /(pr[eé]stamo|transfi[eé]reme|yape|plin|cripto|inversi[oó]n)/i,
  },
  { signal: 'private-place', pattern: /(mi casa|mi depa|hotel|hostal|habitaci[oó]n|airbnb)/i },
  {
    signal: 'risky-opportunity',
    pattern: /(casting privado|multinivel|trabajo f[aá]cil|viajemos solas)/i,
  },
  { signal: 'threat', pattern: /(te voy a hacer da[ñn]o|te voy a encontrar|amenaza)/i },
];

export class MockModerationService implements ModerationService {
  async evaluate(message: string): Promise<ModerationDecision> {
    const signals = RULES.filter(({ pattern }) => pattern.test(message)).map(
      ({ signal }) => signal,
    );
    if (signals.includes('external-contact')) {
      return {
        action: 'block',
        signals,
        message: 'Por seguridad, no puedes compartir datos de contacto externos dentro de AMIX.',
      };
    }
    if (signals.includes('threat') || signals.includes('money-request')) {
      return {
        action: 'review',
        signals,
        message: 'Este mensaje necesita revisión antes de enviarse.',
      };
    }
    if (signals.length > 0) {
      return {
        action: 'warn',
        signals,
        message: 'Revisa el contexto y mantén los primeros encuentros en lugares públicos.',
      };
    }
    return { action: 'allow', signals: [] };
  }
}

export class FutureServerModerationService implements ModerationService {
  async evaluate(): Promise<never> {
    throw new Error('La moderación del servidor todavía no está configurada.');
  }
}

export const moderationService = new MockModerationService();
