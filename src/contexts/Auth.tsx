import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AsyncStorage } from 'react-native';
import { authApi } from '../api/authApi';
import { FavoriteCities, AuthContextData } from '../models';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const setNull = {
    id: null as any,
    name: null as any,
    email: null as any,
    createdAt: null as any,
    updatedAt: null as any,
    token: null as any,
  };
  const [haveUser, setHaveUser] = useState(false);
  const [favoriteCities, setFavoriteCities] = useState<FavoriteCities>({
    name: null as any,
    cityId: null as any,
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(setNull);

  useEffect(() => {
    async function loadStorageData() {
      AsyncStorage.clear();
      setLoading(false);
    }
    loadStorageData();
  }, [haveUser]);

  async function signIn(email: string, password: string) {
    const response = await authApi.doAuth(email, password);
    const { favoriteCities } = await authApi.getCities();

    setHaveUser(true);
    setUser(response);
    setFavoriteCities(favoriteCities);
    console.log('cities: ', favoriteCities);

    axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
    await AsyncStorage.setItem('@RNAuth:token', JSON.stringify(response.token));
    await AsyncStorage.setItem('@RNAuth:cities', JSON.stringify(favoriteCities));
    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response));

    setLoading(false);
  }
  function signOut() {
    AsyncStorage.clear().then(() => setUser(setNull));
    setHaveUser(false);
    setUser(setNull);
    setFavoriteCities({
      name: null as any,
      cityId: null as any,
    });
    delete axios.defaults.headers.common['Authorization'];
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!haveUser,
        haveUser,
        user,
        favoriteCities,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
