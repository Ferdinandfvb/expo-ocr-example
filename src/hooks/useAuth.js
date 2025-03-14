import React, { createContext, useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { signInWithGoogle, signOut } from '../services/firebase';

// Auth-Kontext erstellen
const AuthContext = createContext();

// Auth-Provider-Komponente
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Authentifizierungsstatus überwachen
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Bereinigungsfunktion
    return () => unsubscribe();
  }, []);

  // Anmeldung mit Google
  const login = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error('Login-Fehler:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Abmelden
  const logout = async () => {
    try {
      setLoading(true);
      await signOut();
    } catch (error) {
      console.error('Logout-Fehler:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Kontext-Wert
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Auth-Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth muss innerhalb eines AuthProviders verwendet werden');
  }
  return context;
};

export default useAuth; 