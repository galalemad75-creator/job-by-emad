// Privacy Policy Screen
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, RADIUS } from '../constants/colors';

export default function PrivacyPolicyScreen({ navigation }) {
  const { t, lang } = useApp();
  const isEn = lang === 'en';
  const s = styles(COLORS);

  const Section = ({ title, text }) => (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{title}</Text>
      <Text style={s.sectionText}>{text}</Text>
    </View>
  );

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{isEn ? 'Privacy Policy' : 'سياسة الخصوصية'}</Text>
      </View>
      <View style={s.hero}>
        <Text style={s.heroEmoji}>🔒</Text>
        <Text style={s.heroDate}>{isEn ? 'Last Updated: April 2026' : 'آخر تحديث: أبريل 2026'}</Text>
      </View>
      <View style={s.content}>
        <Section title={isEn ? '1. Information We Collect' : '1. المعلومات التي نجمعها'} text={isEn ? 'We collect: name, email, phone number, device data and IP address for service improvement.' : 'نجمع: الاسم، البريد الإلكتروني، رقم الهاتف، بيانات الجهاز وعنوان IP لتحسين الخدمة.'} />
        <Section title={isEn ? '2. How We Use It' : '2. استخدام المعلومات'} text={isEn ? 'To provide job search services, send notifications, improve user experience, and display relevant ads via Google AdSense.' : 'لتقديم خدمات البحث عن وظائف، إرسال الإشعارات، تحسين التجربة، وعرض إعلانات عبر Google AdSense.'} />
        <Section title={isEn ? '3. Cookies & Tracking' : '3. ملفات تعريف الارتباط'} text={isEn ? 'We use cookies: Essential (session, language), Analytics (Google Analytics), Advertising (Google AdSense including DART), Preference (your settings).' : 'نستخدم الكوكيز: الأساسية (الجلسة، اللغة)، التحليلية (Google Analytics)، الإعلانية (Google AdSense بما في ذلك DART)، التفضيلية (إعداداتك).'} />
        <Section title={isEn ? '4. Advertising & AdSense' : '4. الإعلانات و AdSense'} text={isEn ? 'We use Google AdSense. Google uses cookies (including DART) for ads based on your visits. Opt out at Google Ads Settings.' : 'نستخدم Google AdSense. يستخدم Google ملفات تعريف الارتباط (بما في ذلك DART) للإعلانات. يمكنك الإلغاء من إعدادات إعلانات Google.'} />
        <Section title={isEn ? '5. Third-Party Services' : '5. خدمات الطرف الثالث'} text={isEn ? 'Google AdSense (Advertising), Google Analytics (Analytics), Google Fonts (Typography), Firebase (Auth & DB).' : 'Google AdSense (الإعلانات)، Google Analytics (التحليلات)، Google Fonts (الخطوط)، Firebase (المصادقة وقاعدة البيانات).'} />
        <Section title={isEn ? '6. Data Protection' : '6. حماية البيانات'} text={isEn ? 'We implement TLS/SSL encryption and secure authentication.' : 'نطبق تشفير TLS/SSL والمصادقة الآمنة.'} />
        <Section title={isEn ? '7. Information Sharing' : '7. مشاركة المعلومات'} text={isEn ? 'We do not sell your data. Share only with legal authorities when required.' : 'لا نبيع بياناتك. نشارك فقط مع الجهات القانونية عند الطلب.'} />
        <Section title={isEn ? "8. Children's Privacy" : '8. خصوصية الأطفال'} text={isEn ? 'For users 18+. We do not collect data from minors. Contact: emadh5156@gmail.com' : 'المنصة للبالغين 18+ فقط. لا نجمع بيانات من القاصرين. تواصل: emadh5156@gmail.com'} />
        <Section title={isEn ? '9. Data Retention' : '9. الاحتفاظ بالبيانات'} text={isEn ? 'Data deleted within 30 days of account deletion request.' : 'يتم حذف البيانات خلال 30 يوماً من طلب الحذف.'} />
        <Section title={isEn ? '10. Your Rights' : '10. حقوقك'} text={isEn ? 'Access, modify, or delete your data. Opt out of personalized ads.' : 'الوصول لبياناتك وتعديلها أو حذفها. إلغاء الإعلانات المخصصة.'} />
        <Section title={isEn ? '11. Changes' : '11. التغييرات'} text={isEn ? 'We may update this policy. Continued use constitutes acceptance.' : 'قد نحدّث هذه السياسة. الاستمرار يعني القبول.'} />
        <Section title={isEn ? '12. Contact' : '12. التواصل'} text={isEn ? 'Privacy inquiries: emadh5156@gmail.com' : 'للاستفسارات: emadh5156@gmail.com'} />
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
});
