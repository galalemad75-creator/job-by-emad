import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView, Linking, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, SHADOWS, RADIUS } from '../constants/colors';
import Header from '../components/Header';
import Card from '../components/Card';

export default function SettingsScreen() {
  const { t, lang, changeLang, plan, alertEnabled, toggleAlert, savedJob, saveJobForAlert } = useApp();

  const Row = ({ icon, label, onPress, right, iconColor = COLORS.primary }) => (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.rowLeft}>
        <View style={[styles.rowIcon, { backgroundColor: iconColor + '15' }]}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      {right || <Ionicons name="chevron-forward" size={18} color={COLORS.gray400} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      showsVerticalScrollIndicator={false}
    >
      <Header
        title={t('settings')}
        subtitle={t('appName')}
        icon="⚙️"
      />

      <View style={{ padding: 20, marginTop: -10 }}>
        {/* Language Section */}
        <Text style={styles.sectionTitle}>🌐 {t('language')}</Text>
        <View style={styles.langRow}>
          {[
            { code: 'ar', label: '🇪🇬 العربية', color: COLORS.primary },
            { code: 'en', label: '🇺🇸 English', color: COLORS.secondary },
          ].map(l => (
            <TouchableOpacity
              key={l.code}
              style={[
                styles.langBtn,
                lang === l.code && [styles.langBtnActive, { backgroundColor: l.color, borderColor: l.color }],
              ]}
              onPress={() => changeLang(l.code)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.langBtnText,
                lang === l.code && styles.langBtnTextActive,
              ]}>
                {l.label}
              </Text>
              {lang === l.code && (
                <Ionicons name="checkmark-circle" size={20} color={COLORS.white} style={{ marginLeft: 8 }} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Daily Alert */}
        <Text style={styles.sectionTitle}>🔔 {t('dailyAlert')}</Text>
        <Card variant="elevated" style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <View style={styles.alertInfo}>
              <Ionicons name="notifications" size={22} color={COLORS.accent} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.alertTitle}>{t('dailyAlert')}</Text>
                <Text style={styles.alertDesc}>
                  {plan === 'pro' || plan === 'global'
                    ? t('alertEnabled')
                    : `⭐ ${t('proFeature')}`
                  }
                </Text>
              </View>
            </View>
            <Switch
              value={alertEnabled}
              onValueChange={() => {
                if (plan !== 'pro' && plan !== 'global') {
                  Alert.alert('⭐', t('proFeature'));
                  return;
                }
                toggleAlert();
              }}
              trackColor={{ true: COLORS.accent + '80', false: COLORS.gray200 }}
              thumbColor={alertEnabled ? COLORS.accent : COLORS.gray400}
            />
          </View>
          {alertEnabled && (
            <TextInput
              style={styles.alertInput}
              placeholder={t('jobTitleHint')}
              value={savedJob}
              onChangeText={saveJobForAlert}
              placeholderTextColor={COLORS.gray400}
            />
          )}
        </Card>

        {/* Info Section */}
        <Text style={styles.sectionTitle}>ℹ️ Info</Text>
        <Card variant="elevated" style={styles.infoCard}>
          <Row
            icon="shield-checkmark-outline"
            label={t('privacyPolicy')}
            iconColor={COLORS.success}
            onPress={() => Linking.openURL('https://jobbyemad.com/privacy')}
          />
          <Row
            icon="document-text-outline"
            label={t('terms')}
            iconColor={COLORS.secondary}
            onPress={() => Linking.openURL('https://jobbyemad.com/terms')}
          />
          <Row
            icon="help-circle-outline"
            label={t('support')}
            iconColor={COLORS.warning}
            onPress={() => Linking.openURL('mailto:support@jobbyemad.com')}
          />
          <Row
            icon="information-circle-outline"
            label={`${t('version')}`}
            iconColor={COLORS.gray500}
            onPress={() => {}}
            right={<Text style={styles.versionText}>v1.0.0</Text>}
          />
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ by Emad</Text>
          <Text style={styles.footerSub}>Job by Emad © 2026</Text>
        </View>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.lightText,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 20,
  },
  langRow: {
    flexDirection: 'row',
    gap: 12,
  },
  langBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.gray200,
    ...SHADOWS.small,
  },
  langBtnActive: {
    borderWidth: 0,
    ...SHADOWS.medium,
  },
  langBtnText: {
    fontSize: 15,
    color: COLORS.darkText,
    fontWeight: '700',
  },
  langBtnTextActive: {
    color: COLORS.white,
  },
  alertCard: {
    padding: 18,
    borderRadius: RADIUS.xl,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.darkText,
  },
  alertDesc: {
    fontSize: 13,
    color: COLORS.lightText,
    marginTop: 2,
  },
  alertInput: {
    marginTop: 14,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderRadius: RADIUS.md,
    padding: 14,
    fontSize: 15,
    backgroundColor: COLORS.gray50,
    color: COLORS.darkText,
  },
  infoCard: {
    padding: 0,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.gray100,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 15,
    color: COLORS.darkText,
    fontWeight: '600',
  },
  versionText: {
    fontSize: 14,
    color: COLORS.gray500,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.darkText,
  },
  footerSub: {
    fontSize: 12,
    color: COLORS.lightText,
    marginTop: 4,
  },
});
