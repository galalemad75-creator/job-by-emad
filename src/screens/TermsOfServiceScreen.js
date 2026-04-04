// Terms of Service Screen
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, RADIUS } from '../constants/colors';

export default function TermsOfServiceScreen({ navigation }) {
  const { t, lang } = useApp();
  const isEn = lang === 'en';
  const s = styles(COLORS);

  const Section = ({ title, text }) => (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{title}</Text>
      <Text style={s.sectionText}>{text}</Text>
    </View>
  );

  const List = ({ title, items }) => (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{title}</Text>
      {items.map((item, i) => (
        <Text key={i} style={s.listItem}>• {item}</Text>
      ))}
    </View>
  );

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{isEn ? 'Terms of Service' : 'شروط الاستخدام'}</Text>
      </View>
      <View style={s.hero}>
        <Text style={s.heroEmoji}>📜</Text>
        <Text style={s.heroDate}>{isEn ? 'Last Updated: April 2026' : 'آخر تحديث: أبريل 2026'}</Text>
      </View>
      <View style={s.content}>
        <Section title={isEn ? '1. Acceptance' : '1. القبول'} text={isEn ? 'By using Job by Emad, you agree to these terms.' : 'باستخدام التطبيق فإنك توافق على هذه الشروط.'} />
        <Section title={isEn ? '2. Service Description' : '2. وصف الخدمة'} text={isEn ? 'Job by Emad helps users search for job opportunities in embassies and consulates worldwide.' : 'يساعدك التطبيق على البحث عن فرص عمل في السفارات والقنصليات حول العالم.'} />
        <Section title={isEn ? '3. Age Requirements' : '3. شروط العمر'} text={isEn ? 'You must be 18+ to use the app.' : 'يجب أن يكون عمرك 18+ لاستخدام التطبيق.'} />
        <Section title={isEn ? '4. Subscriptions' : '4. الاشتراكات'} text={isEn ? 'Free, Basic, Pro, and Global plans available. Payments via App Store/Google Play.' : 'باقات مجانية وBasic وPro وGlobal متاحة. الدفع عبر App Store/Google Play.'} />
        <Section title={isEn ? '5. Liability' : '5. المسؤولية'} text={isEn ? 'The app is an informational tool. Not responsible for hiring decisions or job outcomes.' : 'التطبيق أداة إعلامية فقط. غير مسؤول عن قرارات التوظيف أو نتائج العمل.'} />
        <Section title={isEn ? '6. Account Deletion' : '6. حذف الحساب'} text={isEn ? 'Request deletion anytime. Completed within 30 days. Contact: emadh5156@gmail.com' : 'يمكن طلب الحذف في أي وقت. يتم خلال 30 يوماً.'} />
        <Section title={isEn ? '7. Governing Law' : '7. القانون المعمول به'} text={isEn ? 'Governed by applicable laws.' : 'تخضع للقوانين المعمول بها.'} />
        <List title={isEn ? '8. Google Play Compliance' : '8. التوافق مع Google Play'} items={[
          isEn ? 'Complies with Google Play policies' : 'يتوافق مع سياسات Google Play',
          isEn ? 'No unnecessary data collection' : 'لا نجمع بيانات زائدة',
          isEn ? 'No malware' : 'لا برامج ضارة',
          isEn ? 'Data deletion provided' : 'نوفر آلية حذف البيانات',
          isEn ? 'No data selling' : 'لا بيع بيانات',
          isEn ? 'Ads comply with policies' : 'إعلانات متوافقة',
          isEn ? '18+ rating' : 'تصنيف 18+',
          isEn ? 'Privacy policy provided' : 'نوفر سياسة خصوصية',
          isEn ? 'All 15 Google Play requirements met' : 'جميع متطلبات Google Play الـ 15 مطبقة',
        ]} />
        <List title={isEn ? '9. Apple App Store Compliance' : '9. التوافق مع Apple App Store'} items={[
          isEn ? 'Complies with Apple guidelines' : 'يتوافق مع إرشادات Apple',
          isEn ? 'Clear privacy policy' : 'خصوصية واضحة',
          isEn ? '18+ rating suitable' : 'تصنيف 18+ مناسب',
          isEn ? 'Data management provided' : 'نوفر إدارة البيانات',
          isEn ? 'All 15 App Store requirements met' : 'جميع متطلبات App Store الـ 15 مطبقة',
        ]} />
        <List title={isEn ? '10. Google AdSense Compliance' : '10. التوافق مع Google AdSense'} items={[
          isEn ? 'Ads comply with AdSense policies' : 'إعلانات متوافقة',
          isEn ? 'Users can opt out of ads' : 'يمكن إلغاء الإعلانات المخصصة',
          isEn ? 'GDPR/CCPA compliant' : 'نتوافق مع GDPR و CCPA',
          isEn ? 'All 11 AdSense requirements met' : 'جميع متطلبات AdSense الـ 11 مطبقة',
        ]} />
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingTop: 50 },
  backBtn: { marginRight: 12 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.darkText },
  hero: { alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: COLORS.gray100 },
  heroEmoji: { fontSize: 48, marginBottom: 8 },
  heroDate: { fontSize: 13, color: COLORS.lightText },
  content: { padding: 20 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.primary, marginBottom: 8 },
  sectionText: { fontSize: 14, color: COLORS.lightText, lineHeight: 24 },
  listItem: { fontSize: 14, color: COLORS.lightText, lineHeight: 24, marginBottom: 4 },
});
