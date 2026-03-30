import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, ActivityIndicator, Alert,
  Animated, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { searchEmbassies } from '../utils/api';
import { COLORS, SHADOWS, RADIUS } from '../constants/colors';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';

const COUNTRIES = [
  { ar:'مصر', en:'Egypt', flag:'🇪🇬' },
  { ar:'السعودية', en:'Saudi Arabia', flag:'🇸🇦' },
  { ar:'الإمارات', en:'United Arab Emirates', flag:'🇦🇪' },
  { ar:'الكويت', en:'Kuwait', flag:'🇰🇼' },
  { ar:'قطر', en:'Qatar', flag:'🇶🇦' },
  { ar:'البحرين', en:'Bahrain', flag:'🇧🇭' },
  { ar:'الأردن', en:'Jordan', flag:'🇯🇴' },
  { ar:'المغرب', en:'Morocco', flag:'🇲🇦' },
  { ar:'تونس', en:'Tunisia', flag:'🇹🇳' },
  { ar:'جنوب أفريقيا', en:'South Africa', flag:'🇿🇦' },
  { ar:'كندا', en:'Canada', flag:'🇨🇦' },
  { ar:'ألمانيا', en:'Germany', flag:'🇩🇪' },
  { ar:'فرنسا', en:'France', flag:'🇫🇷' },
  { ar:'المملكة المتحدة', en:'United Kingdom', flag:'🇬🇧' },
  { ar:'ماليزيا', en:'Malaysia', flag:'🇲🇾' },
  { ar:'اليابان', en:'Japan', flag:'🇯🇵' },
  { ar:'إسبانيا', en:'Spain', flag:'🇪🇸' },
  { ar:'إيطاليا', en:'Italy', flag:'🇮🇹' },
  { ar:'هولندا', en:'Netherlands', flag:'🇳🇱' },
  { ar:'بلجيكا', en:'Belgium', flag:'🇧🇪' },
  { ar:'السويد', en:'Sweden', flag:'🇸🇪' },
  { ar:'النرويج', en:'Norway', flag:'🇳🇴' },
  { ar:'أستراليا', en:'Australia', flag:'🇦🇺' },
  { ar:'أمريكا', en:'United States', flag:'🇺🇸' },
];

export default function HomeScreen({ navigation }) {
  const { t, lang, canSearch, incrementSearch, plan, setResults } = useApp();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const isRTL = lang === 'ar';

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleSearch = async () => {
    if (!selectedCountry) { Alert.alert('⚠️', t('selectCountry')); return; }
    if (!jobTitle.trim()) { Alert.alert('⚠️', t('enterJobTitle')); return; }
    if (!canSearch()) {
      Alert.alert(t('limitReached'), '', [
        { text: t('upgradeNow'), onPress: () => navigation.navigate('Packages') },
        { text: 'OK' },
      ]);
      return;
    }
    setLoading(true);
    try {
      await incrementSearch();
      const data = await searchEmbassies(selectedCountry.en, jobTitle.trim());
      setResults(data);
      navigation.navigate('Results');
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <Header
          title={t('appName')}
          subtitle={t('appSlogan')}
          icon="💼"
        />

        <Animated.View style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          paddingHorizontal: 20,
          marginTop: -30,
        }}>
          {/* Search Card */}
          <Card variant="elevated" style={styles.searchCard}>
            {/* Country Selector */}
            <Text style={[styles.label, isRTL && styles.rtl]}>
              🌍 {t('country')}
            </Text>
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setShowList(!showList)}
              activeOpacity={0.7}
            >
              {selectedCountry ? (
                <View style={styles.selectedCountry}>
                  <Text style={styles.flag}>{selectedCountry.flag}</Text>
                  <Text style={styles.selectorText}>
                    {lang === 'ar' ? selectedCountry.ar : selectedCountry.en}
                  </Text>
                </View>
              ) : (
                <Text style={styles.placeholder}>{t('country')}</Text>
              )}
              <Ionicons
                name={showList ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={COLORS.gray500}
              />
            </TouchableOpacity>

            {showList && (
              <View style={styles.dropdown}>
                <ScrollView nestedScrollEnabled style={{ maxHeight: 220 }}>
                  {COUNTRIES.map((c, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[
                        styles.dropItem,
                        selectedCountry?.en === c.en && styles.dropItemActive,
                      ]}
                      onPress={() => { setSelectedCountry(c); setShowList(false); }}
                    >
                      <Text style={styles.flag}>{c.flag}</Text>
                      <Text style={[
                        styles.dropText,
                        selectedCountry?.en === c.en && { color: COLORS.accent, fontWeight: '700' },
                      ]}>
                        {lang === 'ar' ? c.ar : c.en}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Job Title */}
            <Text style={[styles.label, isRTL && styles.rtl, { marginTop: 16 }]}>
              💼 {t('jobTitle')}
            </Text>
            <TextInput
              style={[styles.input, isRTL && styles.rtlInput]}
              placeholder={t('jobTitleHint')}
              value={jobTitle}
              onChangeText={setJobTitle}
              placeholderTextColor={COLORS.gray400}
              autoCapitalize="words"
            />

            {/* Plan Badge */}
            <View style={styles.badge}>
              <Ionicons
                name={plan === 'free' ? 'shield-outline' : 'diamond'}
                size={16}
                color={plan === 'free' ? COLORS.gray500 : COLORS.accent}
              />
              <Text style={styles.badgeText}>
                {plan === 'free' ? t('freeSearch') : `${t('currentPlan')}: ${plan.toUpperCase()}`}
              </Text>
            </View>

            {/* Search Button */}
            <Button
              title={loading ? t('searching') : t('searchBtn')}
              icon={loading ? undefined : '🔍'}
              onPress={handleSearch}
              loading={loading}
              variant="accent"
              style={{ marginTop: 18 }}
            />
          </Card>

          {/* Stats Cards */}
          <View style={styles.statsRow}>
            <Card variant="elevated" style={[styles.statCard, { backgroundColor: COLORS.primary }]}>
              <Text style={styles.statIcon}>🌍</Text>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>{lang === 'ar' ? 'دولة' : 'Countries'}</Text>
            </Card>
            <Card variant="elevated" style={[styles.statCard, { backgroundColor: COLORS.secondary }]}>
              <Text style={styles.statIcon}>🏢</Text>
              <Text style={styles.statNumber}>100+</Text>
              <Text style={styles.statLabel}>{lang === 'ar' ? 'موقع' : 'Websites'}</Text>
            </Card>
            <Card variant="elevated" style={[styles.statCard, { backgroundColor: COLORS.accent }]}>
              <Text style={styles.statIcon}>⚡</Text>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>{lang === 'ar' ? 'متاح' : 'Available'}</Text>
            </Card>
          </View>
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  searchCard: {
    padding: 22,
    borderRadius: RADIUS.xl,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.darkText,
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  rtl: { textAlign: 'right' },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderRadius: RADIUS.md,
    padding: 14,
    backgroundColor: COLORS.gray50,
  },
  selectedCountry: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flag: { fontSize: 20 },
  selectorText: {
    fontSize: 15,
    color: COLORS.darkText,
    fontWeight: '600',
  },
  placeholder: {
    fontSize: 15,
    color: COLORS.gray400,
  },
  dropdown: {
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderRadius: RADIUS.md,
    marginTop: 8,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
    overflow: 'hidden',
  },
  dropItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.gray100,
  },
  dropItemActive: {
    backgroundColor: '#FFF8E7',
  },
  dropText: {
    fontSize: 15,
    color: COLORS.darkText,
  },
  input: {
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderRadius: RADIUS.md,
    padding: 14,
    fontSize: 15,
    backgroundColor: COLORS.gray50,
    color: COLORS.darkText,
    fontWeight: '500',
  },
  rtlInput: { textAlign: 'right' },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 12,
    backgroundColor: '#EBF5FB',
    borderRadius: RADIUS.sm,
    gap: 8,
  },
  badgeText: {
    fontSize: 13,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: RADIUS.lg,
  },
  statIcon: { fontSize: 24, marginBottom: 6 },
  statNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.white,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginTop: 2,
  },
});
