import React, { createContext, useState, useEffect, useContext } from 'react';
import { AsyncStorage } from 'react-native';
// import api from '../services/api';
import * as auth from '../services/auth';

interface UserInterface {
  name: string;
  email: string;
}
interface AuthContextData {
  signed: boolean;
  user: UserInterface | null;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@RNAuth:user');
      const storageToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storageToken !== null && storageUser !== null) {
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    }
    loadStorageData();
  });

  async function signIn() {
    const response = await auth.signIn();
    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);

    setUser(response.user);
    setLoading(false);
    // api.defaults.headers['Authorization'] = `Bearer ${response.token}`;
  }
  function signOut() {
    AsyncStorage.clear().then(() => setUser(null));
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
