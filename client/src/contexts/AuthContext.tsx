import { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  signInWithGoogle, 
  logoutUser, 
  onAuthStateChange, 
  FirebaseUser 
} from '@/lib/firebase';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  firstName?: string;
  lastName?: string;
  department?: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  token: string | null;
  login: (username?: string, password?: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const isAuthenticated = !!user && (!!token || !!firebaseUser);

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        // Convert Firebase user to our user format
        const userData: User = {
          id: firebaseUser.uid,
          username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'user',
          email: firebaseUser.email || '',
          role: determineUserRole(firebaseUser.email || ''),
          firstName: firebaseUser.displayName?.split(' ')[0],
          lastName: firebaseUser.displayName?.split(' ').slice(1).join(' '),
          photoURL: firebaseUser.photoURL || undefined
        };
        setUser(userData);
        
        // Get Firebase ID token for API authentication
        try {
          const idToken = await firebaseUser.getIdToken();
          setToken(idToken);
          localStorage.setItem('auth_token', idToken);
        } catch (error) {
          console.error('Error getting Firebase token:', error);
        }
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth_token');
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Helper function to determine user role based on email
  const determineUserRole = (email: string): 'admin' | 'user' | 'manager' => {
    if (email.includes('admin') || email.endsWith('@admin.company.com')) {
      return 'admin';
    } else if (email.includes('manager') || email.endsWith('@manager.company.com')) {
      return 'manager';
    }
    return 'user';
  };

  // Traditional login (for demo accounts)
  const login = async (username?: string, password?: string): Promise<boolean> => {
    if (!username || !password) {
      toast({
        title: 'Login Failed',
        description: 'Username and password are required',
        variant: 'destructive'
      });
      return false;
    }

    try {
      const data = await apiRequest('POST', '/api/auth/login', {
        username,
        password
      });

      if (data.success) {
        const { token: newToken, user: userData } = data;
        localStorage.setItem('auth_token', newToken);
        setToken(newToken);
        setUser(userData);
        
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${userData.firstName || userData.username}!`
        });
        
        return true;
      }
      
      return false;
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || 'Invalid credentials',
        variant: 'destructive'
      });
      return false;
    }
  };

  // Google authentication
  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const firebaseUser = await signInWithGoogle();
      
      toast({
        title: 'Login Successful',
        description: `Welcome, ${firebaseUser.displayName || firebaseUser.email}!`
      });
      
      return true;
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast({
        title: 'Google Sign-in Failed',
        description: error.message || 'Failed to sign in with Google',
        variant: 'destructive'
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      // Sign out from Firebase if user is signed in via Firebase
      if (firebaseUser) {
        await logoutUser();
      }
      
      // Clear session token if using traditional auth
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
      setFirebaseUser(null);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.'
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      firebaseUser,
      token,
      login,
      loginWithGoogle,
      logout,
      isLoading,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
}