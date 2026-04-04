// Contact Us Screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, RADIUS, SHADOWS } from '../constants/colors';

export default function ContactUsScreen({ navigation }) {
  const { lang } = useApp();
  const isEn = lang === 'en';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!name || !email || !subject || !message) {
      Alert.alert('⚠️', isEn ? 'All fields are required' : 'جميع الحقول مطلوبة');
      return;
    }
    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
    Linking.openURL(`mailto:emadh5156@gmail.com?subject=${encodeURIComponent('[Job by Emad] ' + subject)}&body=${body}`);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }} showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, paddingTop: 50 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={COLORS.primary} /></TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '800', color: COLORS.darkText, marginLeft: 12 }}>{isEn ? 'Contact Us' : 'اتصل بنا'}</Text>
      </View>
      <View style={{ alignItems: 'center', paddingVertical: 20 }}>
        <Text style={{ fontSize: 48, marginBottom: 8 }}>📬</Text>
        <Text style={{ fontSize: 13, color: COLORS.lightText }}>{isEn ? "We'd love to hear from you!" : 'يسعدنا سماعك!'}</Text>
      </View>
      <View style={{ padding: 20 }}>
        <View style={{ backgroundColor: COLORS.gray50, borderRadius: RADIUS.lg, padding: 16, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: COLORS.gray200 }}>
            <Ionicons name="mail-outline" size={20} color={COLORS.primary} />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 11, color: COLORS.lightText }}>{isEn ? 'Email' : 'البريد'}</Text>
              <Text style={{ color: COLORS.primary, fontWeight: '700' }}>emadh5156@gmail.com</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
            <Ionicons name="time-outline" size={20} color={COLORS.gray500} />
            <Text style={{ fontSize: 12, color: COLORS.lightText, marginLeft: 10 }}>{isEn ? 'We respond within 24-48 hours' : 'نرد خلال 24-48 ساعة'}</Text>
          </View>
        </View>
        {[
          { label: isEn ? 'Your Name *' : 'اسمك *', val: name, set: setName, ph: isEn ? 'Your name' : 'اسمك' },
          { label: isEn ? 'Your Email *' : 'بريدك *', val: email, set: setEmail, ph: 'you@example.com' },
          { label: isEn ? 'Subject *' : 'الموضوع *', val: subject, set: setSubject, ph: isEn ? 'Subject' : 'الموضوع' },
        ].map((f, i) => (
          <View key={i} style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: COLORS.lightText, marginBottom: 6 }}>{f.label}</Text>
            <TextInput value={f.val} onChangeText={f.set} placeholder={f.ph} placeholderTextColor={COLORS.gray400}
              style={{ borderWidth: 1.5, borderColor: COLORS.gray200, borderRadius: RADIUS.md, padding: 14, fontSize: 15, backgroundColor: COLORS.white, color: COLORS.darkText }}
              keyboardType={i === 1 ? 'email-address' : 'default'} autoCapitalize="none" />
          </View>
        ))}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: COLORS.lightText, marginBottom: 6 }}>{isEn ? 'Your Message *' : 'رسالتك *'}</Text>
          <TextInput value={message} onChangeText={setMessage} placeholder={isEn ? 'Write your message...' : 'اكتب رسالتك...'} placeholderTextColor={COLORS.gray400}
            multiline numberOfLines={4} textAlignVertical="top"
            style={{ borderWidth: 1.5, borderColor: COLORS.gray200, borderRadius: RADIUS.md, padding: 14, fontSize: 15, backgroundColor: COLORS.white, color: COLORS.darkText, minHeight: 100 }} />
        </View>
        <TouchableOpacity onPress={handleSend} activeOpacity={0.8}
          style={{ backgroundColor: COLORS.primary, borderRadius: RADIUS.lg, padding: 16, alignItems: 'center', ...SHADOWS.medium }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>📤 {isEn ? 'Send Message' : 'إرسال'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
