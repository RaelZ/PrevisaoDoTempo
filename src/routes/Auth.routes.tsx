import React from 'react';
import SignIn from '../pages/signIn/Index';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Entrar" component={SignIn} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
