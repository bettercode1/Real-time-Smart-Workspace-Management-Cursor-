import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ar';
export type ThemeMode = 'light' | 'dark';

interface SettingsContextType {
  // Theme settings
  themeMode: ThemeMode;
  toggleTheme: () => void;
  
  // Language settings
  language: Language;
  setLanguage: (lang: Language) => void;
  
  // Notification settings
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    sound: boolean;
    vibration: boolean;
  };
  updateNotificationSetting: (key: keyof SettingsContextType['notifications'], value: boolean) => void;
  
  // Security settings
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (enabled: boolean) => void;
  
  // Profile settings
  profile: {
    name: string;
    email: string;
    badgeId: string;
    department: string;
  };
  updateProfile: (updates: Partial<SettingsContextType['profile']>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  // Load initial values from localStorage
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('themeMode');
    return (saved as ThemeMode) || 'light';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : {
      email: true,
      sms: true,
      push: true,
      sound: true,
      vibration: false,
    };
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(() => {
    const saved = localStorage.getItem('twoFactorEnabled');
    return saved ? JSON.parse(saved) : false;
  });

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : {
      name: 'John Doe',
      email: 'john.doe@company.com',
      badgeId: 'BD001',
      department: 'Engineering',
    };
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // Save language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Apply RTL for Arabic
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Save notification settings
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Save 2FA setting
  useEffect(() => {
    localStorage.setItem('twoFactorEnabled', JSON.stringify(twoFactorEnabled));
  }, [twoFactorEnabled]);

  // Save profile
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const updateNotificationSetting = (key: keyof SettingsContextType['notifications'], value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateProfile = (updates: Partial<SettingsContextType['profile']>) => {
    setProfile(prev => ({
      ...prev,
      ...updates
    }));
  };

  const value: SettingsContextType = {
    themeMode,
    toggleTheme,
    language,
    setLanguage,
    notifications,
    updateNotificationSetting,
    twoFactorEnabled,
    setTwoFactorEnabled,
    profile,
    updateProfile,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};