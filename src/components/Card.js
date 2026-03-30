import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SHADOWS, RADIUS } from '../constants/colors';

export default function Card({ children, style, variant = 'default' }) {
  return (
    <View style={[
      styles.base,
      variant === 'elevated' && styles.elevated,
      variant === 'outlined' && styles.outlined,
      variant === 'glass' && styles.glass,
      style,
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 18,
    marginBottom: 14,
  },
  elevated: {
    ...SHADOWS.medium,
  },
  outlined: {
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
  },
  glass: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    ...SHADOWS.small,
  },
});
