import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SHADOWS, RADIUS } from '../constants/colors';

export default function Button({ title, onPress, loading, icon, variant = 'primary', style }) {
  const isPrimary = variant === 'primary';
  const isAccent = variant === 'accent';

  return (
    <TouchableOpacity
      style={[
        styles.base,
        isPrimary && styles.primary,
        isAccent && styles.accent,
        loading && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={[
            styles.text,
            isPrimary && { color: COLORS.white },
            isAccent && { color: COLORS.primary },
          ]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: RADIUS.lg,
    gap: 8,
  },
  primary: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.medium,
  },
  accent: {
    backgroundColor: COLORS.accent,
    ...SHADOWS.medium,
  },
  disabled: {
    opacity: 0.6,
  },
  icon: {
    fontSize: 18,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
