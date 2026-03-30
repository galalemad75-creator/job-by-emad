import React, { useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Linking, Alert, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, SHADOWS, RADIUS } from '../constants/colors';
import Header from '../components/Header';
import Card from '../components/Card';

export default function ResultsScreen({ navigation }) {
  const { t, lang, results } = useApp();
  const isRTL = lang === 'ar';
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, duration: 400, useNativeDriver: true,
    }).start();
  }, []);

  const open = async (url) => {
    try { await Linking.openURL(url); }
    catch(e) { Alert.alert('Error', e.message); }
  };

  if (!results || results.length === 0) return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Header title={t('results')} subtitle={t('noResults')} icon="📋" />
      <View style={styles.empty}>
        <View style={styles.emptyIconWrap}>
          <Ionicons name="search-outline" size={56} color={COLORS.gray400} />
        </View>
        <Text style={styles.emptyTitle}>{t('noResults')}</Text>
        <Text style={styles.emptyHint}>{t('noResultsHint')}</Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}
        >
          <Ionicons name="search" size={18} color={COLORS.white} />
          <Text style={styles.backBtnText}>{t('searchBtn')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({ item, index }) => {
    const animDelay = index * 100;
    return (
      <Animated.View style={{
        opacity: fadeAnim,
        transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
      }}>
        <Card variant="elevated" style={styles.resultCard}>
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.cardIconWrap}>
              <Ionicons name="business" size={22} color={COLORS.white} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, isRTL && styles.rtl]} numberOfLines={2}>
                {item.name}
              </Text>
              {item.country && (
                <Text style={styles.cardCountry}>🌍 {item.country}</Text>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            {item.website && (
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: COLORS.primary }]}
                onPress={() => open(item.website)}
                activeOpacity={0.8}
              >
                <Ionicons name="globe-outline" size={16} color={COLORS.white} />
                <Text style={styles.actionText}>{t('openWebsite')}</Text>
              </TouchableOpacity>
            )}
            {item.facebookSearch && (
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: COLORS.facebook }]}
                onPress={() => open(item.facebookSearch)}
                activeOpacity={0.8}
              >
                <Ionicons name="logo-facebook" size={16} color={COLORS.white} />
                <Text style={styles.actionText}>{t('openFacebook')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </Card>
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Header
        title={t('results')}
        subtitle={`${results.length} ${t('embassiesFound')}`}
        icon="📋"
      />
      <FlatList
        data={results}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ padding: 20, paddingTop: 14 }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  resultCard: {
    padding: 18,
    borderRadius: RADIUS.xl,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 14,
  },
  cardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.darkText,
    lineHeight: 22,
  },
  cardCountry: {
    fontSize: 13,
    color: COLORS.lightText,
    marginTop: 4,
    fontWeight: '500',
  },
  rtl: { textAlign: 'right' },
  actions: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
    gap: 6,
    ...SHADOWS.small,
  },
  actionText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyIconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.darkText,
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 14,
    color: COLORS.lightText,
    textAlign: 'center',
    lineHeight: 20,
  },
  backBtn: {
    marginTop: 24,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    ...SHADOWS.medium,
  },
  backBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 15,
  },
});
