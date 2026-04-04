// About Us Screen
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, RADIUS } from '../constants/colors';

export default function AboutUsScreen({ navigation }) {
  const { lang } = useApp();
  const isEn = lang === 'en';

  const Stat = ({ emoji, num, label }) => (
    <View style={{ flex: 1, backgroundColor: COLORS.gray50, borderRadius: RADIUS.lg, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: COLORS.gray100 }}>
      <Text style={{ fontSize: 24 }}>{emoji}</Text>
      <Text style={{ fontSize: 20, fontWeight: '800', color: COLORS.primary }}>{num}</Text>
      <Text style={{ fontSize: 11, color: COLORS.lightText, marginTop: 2 }}>{label}</Text>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }} showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, paddingTop: 50 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={COLORS.primary} /></TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '800', color: COLORS.darkText, marginLeft: 12 }}>{isEn ? 'About Us' : 'من نحن'}</Text>
      </View>
      <View style={{ alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: COLORS.gray100, marginBottom: 20 }}>
        <Text style={{ fontSize: 56, marginBottom: 8 }}>💼</Text>
        <Text style={{ fontSize: 24, fontWeight: '800', color: COLORS.darkText }}>Job by Emad</Text>
        <Text style={{ fontSize: 13, color: COLORS.lightText, marginTop: 4 }}>{isEn ? 'Find your job anywhere' : 'ابحث عن وظيفتك في أي مكان'}</Text>
        <Text style={{ fontSize: 12, color: COLORS.primary, fontWeight: '700', marginTop: 8 }}>{isEn ? 'Making job search accessible to everyone' : 'نجعل البحث عن وظيفة متاح للجميع'}</Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.darkText, marginBottom: 10 }}>🎯 {isEn ? 'Our Mission' : 'مهمتنا'}</Text>
        <Text style={{ fontSize: 14, color: COLORS.lightText, lineHeight: 24, marginBottom: 20 }}>
          {isEn ? 'We help job seekers find opportunities in embassies and consulates worldwide through a smart, easy-to-use platform.' : 'نساعد الباحثين عن عمل لإيجاد فرص في السفارات والقنصليات حول العالم من خلال منصة ذكية وسهلة الاستخدام.'}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.darkText, marginBottom: 10 }}>👁️ {isEn ? 'Our Vision' : 'رؤيتنا'}</Text>
        <Text style={{ fontSize: 14, color: COLORS.lightText, lineHeight: 24, marginBottom: 20 }}>
          {isEn ? 'To be the leading platform for embassy job opportunities in the Middle East and beyond.' : 'أن نكون المنصة الرائدة لفرص عمل السفارات في الشرق الأوسط وما بعده.'}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.darkText, marginBottom: 12 }}>📊 {isEn ? 'By The Numbers' : 'بالأرقام'}</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 20 }}>
          <Stat emoji="🔍" num="50K+" label={isEn ? 'Searches' : 'بحث'} />
          <Stat emoji="🌍" num="195" label={isEn ? 'Countries' : 'دولة'} />
          <Stat emoji="👥" num="10K+" label={isEn ? 'Users' : 'مستخدم'} />
          <Stat emoji="⚡" num="99.9%" label={isEn ? 'Uptime' : 'وقت التشغيل'} />
        </View>
        <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.darkText, marginBottom: 10 }}>📬 {isEn ? 'Contact' : 'تواصل معنا'}</Text>
        <Text style={{ fontSize: 14, color: COLORS.lightText, marginBottom: 20 }}>📧 emadh5156@gmail.com</Text>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
