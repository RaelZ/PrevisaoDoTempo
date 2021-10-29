import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { authApi } from '../api/authApi';
import { FavoriteCities, AuthContextData, CityInfo } from '../models';

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
  const [favoriteCitiesInfo, setfavoriteCitiesInfo] = useState<CityInfo>({
    city: null as any,
    condition_code: null as any,
    currently: null as any,
    date: null as any,
    description: null as any,
    wind_speedy: null as any,
    humidity: null as any,
    temp: null as any,
    latitude: null as any,
    longitude: null as any,
    time: null as any,
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(setNull);

  useEffect(() => {
    async function loadStorageData() {
      setLoading(false);
    }
    loadStorageData();
  }, [haveUser]);

  async function signUp(user: string, email: string, password: string) {
    const response = await authApi.signUp(user, email, password);
    console.log(response);
  }

  async function favoriteCity() {
    const { favoriteCities } = await authApi.getCities();
    const favoriteCitiesInfo = await authApi.getWeatherFavorityCities();
    setFavoriteCities(favoriteCities);
    setfavoriteCitiesInfo(favoriteCitiesInfo);
  }

  async function signIn(email: string, password: string) {
    const response = await authApi.doAuth(email, password);
    favoriteCity();

    setHaveUser(true);
    setUser(response);

    axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;

    setLoading(false);
  }
  function signOut() {
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
        favoriteCitiesInfo,
        favoriteCity,
        loading,
        signIn,
        signOut,
        signUp,
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
