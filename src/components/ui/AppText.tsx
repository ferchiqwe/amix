import type { PropsWithChildren } from 'react';
import { Text, type TextProps, type TextStyle } from 'react-native';

import { colors, typography } from '@/theme/tokens';

type AppTextProps = PropsWithChildren<
  TextProps & {
    variant?: 'caption' | 'body' | 'lead' | 'title' | 'hero' | 'label';
    color?: string;
    align?: TextStyle['textAlign'];
  }
>;

const variantStyles: Record<NonNullable<AppTextProps['variant']>, TextStyle> = {
  caption: { fontSize: typography.sizes.caption, lineHeight: 17 },
  body: { fontSize: typography.sizes.body, lineHeight: 22 },
  lead: { fontSize: typography.sizes.lead, lineHeight: 26 },
  title: { fontFamily: typography.editorial, fontSize: typography.sizes.title, lineHeight: 31 },
  hero: { fontFamily: typography.editorial, fontSize: typography.sizes.hero, lineHeight: 45 },
  label: { fontSize: 13, lineHeight: 17, fontWeight: '700', letterSpacing: 0.3 },
};

export function AppText({
  children,
  variant = 'body',
  color = colors.ink,
  align,
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      allowFontScaling
      maxFontSizeMultiplier={2}
      style={[
        { color, fontFamily: typography.body, textAlign: align },
        variantStyles[variant],
        style,
      ]}
    >
      {children}
    </Text>
  );
}
