import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, SHADOWS, RADIUS } from '../constants/colors';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';

const PKGS = [
  {
    key: 'free',
    price: 0,
    icon: 'gift-outline',
    color: COLORS.gray600,
    gradient: ['#868E96', '#ADB5BD'],
    features: ['featOneSearch'],
  },
  {
    key: 'basic',
    price: 25,
    icon: 'flash-outline',
    color: COLORS.secondary,
    gradient: COLORS.gradientCool,
    features: ['featUnlimitedSearch'],
  },
  {
    key: 'pro',
    price: 40,
    icon: 'star-outline',
    color: COLORS.accent,
    gradient: COLORS.gradientAccent,
    features: ['featUnlimitedSearch', 'featDailyAlert'],
    popular: true,
  },
  {
    key: 'global',
    price: 65,
    icon: 'globe',
    color: COLORS.success,
    gradient: COLORS.gradientSuccess,
    features: ['featUnlimitedSearch', 'featDailyAlert', 'featAllCountries'],
  },
];

export default function PackagesScreen() {
  const { t, plan, savePlan } = useApp();

  const getPackageLabel = (key) => {
    const map = { free: 'Free', basic: 'Basic', pro: 'Pro', global: 'Global' };
    return map[key] || key;
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      showsVerticalScrollIndicator={false}
    >
      <Header
        title={t('packages')}
        subtitle={t('appSlogan')}
        icon="⭐"
      />
      <View style={{ padding: 20, marginTop: -10 }}>
        {PKGS.map((pkg, idx) => {
          const active = plan === pkg.key;
          return (
            <Card
              key={pkg.key}
              variant="elevated"
              style={[
                styles.pkgCard,
                active && { borderColor: pkg.color, borderWidth: 2.5 },
              ]}
            >
              {pkg.popular && (
                <View style={[styles.popularBadge, { backgroundColor: pkg.color }]}>
                  <Text style={styles.popularText}>
                    {t('lang') === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                  </Text>
                </View>
              )}

              <View style={styles.pkgTop}>
                <View style={[styles.iconCircle, { backgroundColor: pkg.color + '18' }]}>
                  <Ionicons name={pkg.icon} size={30} color={pkg.color} />
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={styles.pkgName}>
                    {getPackageLabel(pkg.key)}
                  </Text>
                  <Text style={[styles.pkgPrice, { color: pkg.color }]}>
                    {pkg.price === 0 ? t('free') : `$${pkg.price}${t('monthly')}`}
                  </Text>
                </View>
                {active && (
                  <View style={[styles.activeCheck, { backgroundColor: pkg.color + '18' }]}>
                    <Ionicons name="checkmark-circle" size={26} color={pkg.color} />
                  </View>
                )}
              </View>

              {/* Features */}
              <View style={styles.featuresList}>
                {pkg.features.map((f, i) => (
                  <View key={i} style={styles.featureRow}>
                    <View style={[styles.featureDot, { backgroundColor: pkg.color }]}>
                      <Ionicons name="checkmark" size={12} color={COLORS.white} />
                    </View>
                    <Text style={styles.featureText}>{t(f)}</Text>
                  </View>
                ))}
              </View>

              {/* CTA Button */}
              <TouchableOpacity
                style={[
                  styles.ctaBtn,
                  { backgroundColor: active ? COLORS.gray100 : pkg.color },
                  !active && SHADOWS.glow(pkg.color),
                ]}
                disabled={active}
                onPress={() => {
                  if (pkg.key === 'free') { savePlan('free'); return; }
                  Alert.alert(
                    t('subscribe'),
                    `${getPackageLabel(pkg.key)} — $${pkg.price}${t('monthly')}`,
                    [
                      {
                        text: t('subscribe'),
                        onPress: () => {
                          savePlan(pkg.key);
                          Alert.alert('✅', 'Activated!');
                        },
                      },
                      { text: 'Cancel', style: 'cancel' },
                    ]
                  );
                }}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.ctaText,
                  active && { color: COLORS.gray500 },
                ]}>
                  {active ? `✓ ${t('currentPlan')}` : t('subscribe')}
                </Text>
              </TouchableOpacity>
            </Card>
          );
        })}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pkgCard: {
    padding: 20,
    borderRadius: RADIUS.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderBottomLeftRadius: RADIUS.md,
  },
  popularText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  pkgTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pkgName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.darkText,
  },
  pkgPrice: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 3,
  },
  activeCheck: {
    borderRadius: 20,
    padding: 4,
  },
  featuresList: {
    marginBottom: 18,
    gap: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    color: COLORS.darkText,
    fontWeight: '500',
  },
  ctaBtn: {
    borderRadius: RADIUS.md,
    paddingVertical: 15,
    alignItems: 'center',
  },
  ctaText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 0.3,
  },
});
