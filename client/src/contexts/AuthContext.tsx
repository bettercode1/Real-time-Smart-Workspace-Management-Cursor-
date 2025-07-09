import React, { createContext, useContext, useEffect, useState } from "react";
import { auth as realAuth } from "@/lib/firebase";
import { mockAuth } from "@/firebase/mock";

const USE_MOCK = true; // Set to true for demo/mock mode, false for real Firebase
const auth = USE_MOCK ? mockAuth : realAuth;

interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'user';
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  role: 'admin' | 'user';
  loading: boolean;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithDemo: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: "user",
  loading: true,
  isAuthenticated: false,
  loginWithGoogle: async () => {},
  loginWithDemo: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_MOCK) {
      // Check if user is already logged in (localStorage)
      const savedUser = localStorage.getItem("demo_user");
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        } catch (error) {
          console.error("Error parsing saved user:", error);
          localStorage.removeItem("demo_user");
        }
      }
      setLoading(false);
    } else {
      const unsubscribe = auth.onAuthStateChanged && auth.onAuthStateChanged((firebaseUser: any) => {
        if (firebaseUser) {
          const userData: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || 'User',
            role: firebaseUser.email?.includes('admin') ? 'admin' : 'user',
            photoURL: firebaseUser.photoURL
          };
          setUser(userData);
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe && unsubscribe();
    }
  }, []);

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const demoUser: User = { 
        uid: "google-user", 
        email: "admin@smartspace.com", 
        displayName: "John Admin", 
        role: "admin",
        photoURL: null
      };
      setUser(demoUser);
      localStorage.setItem("demo_user", JSON.stringify(demoUser));
    } catch (error) {
      console.error("Google login error:", error);
    }
    setLoading(false);
  };

  const loginWithDemo = async () => {
    setLoading(true);
    try {
      const demoUser: User = { 
        uid: "demo-user", 
        email: "user@smartspace.com", 
        displayName: "Jane User", 
        role: "user",
        photoURL: null
      };
      setUser(demoUser);
      localStorage.setItem("demo_user", JSON.stringify(demoUser));
    } catch (error) {
      console.error("Demo login error:", error);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      setUser(null);
      localStorage.removeItem("demo_user");
    } catch (error) {
      console.error("Logout error:", error);
    }
    setLoading(false);
  };

  const role = user?.role || 'user';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      role, 
      loading, 
      isAuthenticated,
      loginWithGoogle, 
      loginWithDemo, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};