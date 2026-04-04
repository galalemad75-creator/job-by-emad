// Refund Policy Screen
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS } from '../constants/colors';

export default function RefundPolicyScreen({ navigation }) {
  const { lang } = useApp();
  const isEn = lang === 'en';
  const s = styles(COLORS);
  const Sec = ({ t, txt }) => <View style={s.sec}><Text style={s.secT}>{t}</Text><Text style={s.secTx}>{txt}</Text></View>;
  return (
    <ScrollView style={s.c} showsVerticalScrollIndicator={false}>
      <View style={s.h}><TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={COLORS.primary} /></TouchableOpacity><Text style={s.ht}>{isEn ? 'Refund Policy' : 'سياسة الاسترجاع'}</Text></View>
      <View style={s.hero}><Text style={s.he}>💰</Text><Text style={s.hd}>{isEn ? 'Last Updated: April 2026' : 'آخر تحديث: أبريل 2026'}</Text></View>
      <View style={s.body}>
        <Sec t={isEn ? '1. Introduction' : '1. مقدمة'} txt={isEn ? 'We want you satisfied. This outlines refund procedures.' : 'نريدك راضياً. توضح هذه السياسة إجراءات الاسترجاع.'} />
        <Sec t={isEn ? '2. Eligibility' : '2. أهلية'} txt={isEn ? 'Within 14 days of purchase. Less than 20% utilized.' : 'خلال 14 يوماً من الشراء. أقل من 20% استخدام.'} />
        <Sec t={isEn ? '3. Process' : '3. الإجراءات'} txt={isEn ? 'Contact emadh5156@gmail.com with email and reason. Review within 5 business days.' : 'تواصل مع emadh5156@gmail.com مع البريد والسبب. نراجع خلال 5 أيام عمل.'} />
        <Sec t={isEn ? '4. Processing Time' : '4. مدة المعالجة'} txt={isEn ? '7-14 business days to original payment method.' : '7-14 يوم عمل إلى طريقة الدفع الأصلية.'} />
        <Sec t={isEn ? '5. Replacement' : '5. الاستبدال'} txt={isEn ? 'For unresolved technical issues within 48 hours, we may offer extension or upgrade.' : 'للمشاكل التقنية غير المحلولة خلال 48 ساعة، قد نقدم تمديد أو ترقية.'} />
        <Sec t={isEn ? '6. Cancellation' : '6. الإلغاء'} txt={isEn ? 'Cancel anytime via App Store/Google Play settings.' : 'يمكن الإلغاء في أي وقت من إعدادات المتجر.'} />
        <Sec t={isEn ? '7. Exceptions' : '7. الاستثناءات'} txt={isEn ? 'No refunds for terminated accounts, promotional plans, or after 14 days.' : 'لا استرجاع للحسابات المنتهية أو الباقات الترويجية أو بعد 14 يوماً.'} />
        <Sec t={isEn ? '8. Contact' : '8. التواصل'} txt={isEn ? 'For refunds: emadh5156@gmail.com' : 'لطلبات الاسترجاع: emadh5156@gmail.com'} />
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
const styles = (C) => StyleSheet.create({
  c: { flex: 1, backgroundColor: C.background }, h: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingTop: 50 }, ht: { fontSize: 20, fontWeight: '800', color: C.darkText, marginLeft: 12 },
  hero: { alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: C.gray100 }, he: { fontSize: 48, marginBottom: 8 }, hd: { fontSize: 13, color: C.lightText },
  body: { padding: 20 }, sec: { marginBottom: 24 }, secT: { fontSize: 16, fontWeight: '700', color: C.primary, marginBottom: 8 }, secTx: { fontSize: 14, color: C.lightText, lineHeight: 24 },
});
