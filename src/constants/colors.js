export const COLORS = {
  // Primary - Deep Navy
  primary: '#0A1628',
  primaryLight: '#1A2D4A',
  primaryDark: '#060E1A',

  // Accent - Vibrant Gold
  accent: '#F5A623',
  accentLight: '#FFD166',
  accentDark: '#E8941A',

  // Secondary - Electric Blue
  secondary: '#2E86DE',
  secondaryLight: '#54A0FF',

  // Semantic
  success: '#2ED573',
  successLight: '#7BED9F',
  warning: '#FFA502',
  danger: '#FF4757',
  dangerLight: '#FF6B81',

  // Neutrals
  background: '#F0F3F8',
  backgroundDark: '#E4E8EF',
  white: '#FFFFFF',
  card: '#FFFFFF',
  gray50: '#F8F9FA',
  gray100: '#F1F3F5',
  gray200: '#E9ECEF',
  gray300: '#DEE2E6',
  gray400: '#CED4DA',
  gray500: '#ADB5BD',
  gray600: '#868E96',
  gray700: '#495057',
  gray800: '#343A40',
  gray900: '#212529',
  darkText: '#1A1D26',
  lightText: '#6C757D',

  // Social
  facebook: '#1877F2',
  whatsapp: '#25D366',
  twitter: '#1DA1F2',
  linkedin: '#0A66C2',

  // Gradients (as arrays)
  gradientPrimary: ['#0A1628', '#1A2D4A'],
  gradientAccent: ['#F5A623', '#FFD166'],
  gradientSuccess: ['#2ED573', '#7BED9F'],
  gradientCool: ['#2E86DE', '#54A0FF'],

  // Glass
  glass: 'rgba(255,255,255,0.15)',
  glassDark: 'rgba(0,0,0,0.05)',
};

export const FONTS = {
  regular: { fontFamily: 'System', fontWeight: '400' },
  medium: { fontFamily: 'System', fontWeight: '500' },
  semibold: { fontFamily: 'System', fontWeight: '600' },
  bold: { fontFamily: 'System', fontWeight: '700' },
  heavy: { fontFamily: 'System', fontWeight: '900' },
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: (color) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  }),
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};
