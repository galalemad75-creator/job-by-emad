import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from '../utils/i18n';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState('ar');
  const [plan, setPlan] = useState('free');
  const [searchCount, setSearchCount] = useState(0);
  const [results, setResults] = useState([]);
  const [savedJob, setSavedJob] = useState('');
  const [alertEnabled, setAlertEnabled] = useState(false);

  useEffect(() => { loadSettings(); }, []);

  const loadSettings = async () => {
    try {
      const storedLang   = await AsyncStorage.getItem('lang');
      const storedPlan   = await AsyncStorage.getItem('plan');
      const storedCount  = await AsyncStorage.getItem('searchCount');
      const storedDate   = await AsyncStorage.getItem('lastSearchDate');
      const storedJob    = await AsyncStorage.getItem('savedJob');
      const storedAlert  = await AsyncStorage.getItem('alertEnabled');
      if (storedLang)  setLang(storedLang);
      if (storedPlan)  setPlan(storedPlan);
      if (storedJob)   setSavedJob(storedJob);
      if (storedAlert) setAlertEnabled(storedAlert === 'true');
      const today = new Date().toDateString();
      if (storedDate === today && storedCount) setSearchCount(parseInt(storedCount));
      else {
        setSearchCount(0);
        await AsyncStorage.setItem('searchCount', '0');
        await AsyncStorage.setItem('lastSearchDate', today);
      }
    } catch (e) {}
  };

  const t = (key) => getTranslation(lang, key);
  const canSearch = () => plan !== 'free' || searchCount < 1;

  const incrementSearch = async () => {
    const n = searchCount + 1;
    setSearchCount(n);
    await AsyncStorage.setItem('searchCount', String(n));
    await AsyncStorage.setItem('lastSearchDate', new Date().toDateString());
  };

  const changeLang  = async (l) => { setLang(l);  await AsyncStorage.setItem('lang', l); };
  const savePlan    = async (p) => { setPlan(p);   await AsyncStorage.setItem('plan', p); };
  const saveJobForAlert = async (j) => { setSavedJob(j); await AsyncStorage.setItem('savedJob', j); };
  const toggleAlert = async () => {
    const v = !alertEnabled; setAlertEnabled(v);
    await AsyncStorage.setItem('alertEnabled', String(v));
  };

  return (
    <AppContext.Provider value={{
      lang, t, changeLang, plan, savePlan,
      canSearch, incrementSearch, searchCount,
      results, setResults,
      savedJob, saveJobForAlert,
      alertEnabled, toggleAlert,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
