import 'react-native-gesture-handler';

import React from 'react';
import type { FC } from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes/Index';
import { AuthProvider } from './contexts/Auth';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
AppRegistry.registerComponent('main', () => App);

const App: FC = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
