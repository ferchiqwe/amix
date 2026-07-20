import { Platform } from 'react-native';

export const colors = {
  cream: '#FAF7EA',
  white: '#FFFEF9',
  peony: '#FAD2E1',
  burgundy: '#770523',
  pistachio: '#D0D996',
  fuchsia: '#D81A67',
  orange: '#DD4E28',
  ink: '#261D21',
  muted: '#9A5365',
  line: '#E8DDD7',
  emergency: '#C6283D',
  success: '#3F704D',
  warning: '#8C5100',
  overlay: 'rgba(38, 29, 33, 0.44)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  hero: 48,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const typography = {
  editorial: 'DMSerifDisplay_400Regular',
  body: Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' }),
  sizes: {
    caption: 12,
    body: 15,
    lead: 18,
    title: 26,
    hero: 42,
  },
} as const;

export const shadows = {
  card: {
    shadowColor: colors.burgundy,
    shadowOpacity: 0.09,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
  },
} as const;

export const touchTarget = 48;
export const contentMaxWidth = 920;
