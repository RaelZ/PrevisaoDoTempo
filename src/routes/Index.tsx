import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../contexts/Auth';
import AppRoutes from './App.routes';
import AuthRoutes from './Auth.routes';

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
