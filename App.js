import React, { useEffect, useRef } from 'react';
import {
  Animated, View, Text, StyleSheet, StatusBar, Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { AppProvider, useApp } from './src/context/AppContext';
import { COLORS, SHADOWS } from './src/constants/colors';
import HomeScreen from './src/screens/HomeScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import PackagesScreen from './src/screens/PackagesScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from './src/screens/TermsOfServiceScreen';
import RefundPolicyScreen from './src/screens/RefundPolicyScreen';
import ContactUsScreen from './src/screens/ContactUsScreen';
import AboutUsScreen from './src/screens/AboutUsScreen';

const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="SettingsMain" component={SettingsScreen} />
      <SettingsStack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <SettingsStack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
      <SettingsStack.Screen name="RefundPolicy" component={RefundPolicyScreen} />
      <SettingsStack.Screen name="ContactUs" component={ContactUsScreen} />
      <SettingsStack.Screen name="AboutUs" component={AboutUsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function AppTabs() {
  const { t } = useApp();

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconMap = {
              Home: focused ? 'search' : 'search-outline',
              Results: focused ? 'list' : 'list-outline',
              Packages: focused ? 'star' : 'star-outline',
              Settings: focused ? 'settings' : 'settings-outline',
            };
            return (
              <View style={focused ? styles.tabIconActive : null}>
                <Ionicons name={iconMap[route.name]} size={focused ? 24 : 22} color={color} />
              </View>
            );
          },
          tabBarActiveTintColor: COLORS.accent,
          tabBarInactiveTintColor: COLORS.gray400,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
          headerShown: false,
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: t('search') }} />
        <Tab.Screen name="Results" component={ResultsScreen} options={{ tabBarLabel: t('results') }} />
        <Tab.Screen name="Packages" component={PackagesScreen} options={{ tabBarLabel: t('packages') }} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} options={{ tabBarLabel: t('settings') }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppTabs />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopWidth: 0,
    height: Platform.OS === 'ios' ? 90 : 70,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
    ...SHADOWS.large,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
  tabIconActive: {
    backgroundColor: COLORS.accent + '15',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
  },
});
