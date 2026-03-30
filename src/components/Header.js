import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SHADOWS, RADIUS } from '../constants/colors';

export default function Header({ title, subtitle, icon }) {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.accentLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
    ...SHADOWS.large,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.accent,
    fontWeight: '600',
    marginTop: 2,
  },
  accentLine: {
    height: 3,
    backgroundColor: COLORS.accent,
    borderRadius: 2,
    marginTop: 16,
    width: 60,
  },
});
