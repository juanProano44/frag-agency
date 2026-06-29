export const colorTokens = {
  ink: "#050505",
  white: "#ffffff",
  sea: "#42495b",
  brick: "#a01c30",
  ochre: "#8e6010",
  pine: "#295926",
  grape: "#3a1056",
  neutral100: "#f2f2f2",
  neutral200: "#d9d9d9",
  neutral300: "#999999",
  neutral400: "#424242",
} as const;

export const spacingTokens = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radiusTokens = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 9999,
} as const;

export const typographyTokens = {
  family: "Satoshi, Inter, Helvetica, Arial, sans-serif",
  sizes: {
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    display: 56,
  },
  lineHeight: {
    compact: 1.2,
    normal: 1.5,
  },
  weight: {
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900,
  },
} as const;
