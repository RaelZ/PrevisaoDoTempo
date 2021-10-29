import React from 'react';
import Account from '../pages/logged/Account';
import SearchCity from '../pages/logged/SearchCity';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet } from 'react-native';
import {
  faCloud,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const AppStack = createBottomTabNavigator();

const styles = StyleSheet.create({
  entrar: {
    backgroundColor: '#00A1E0',
    borderRadius: 50,
  },
  criarConta: {
    backgroundColor: '#73C5E6',
    borderRadius: 50,
  },
  logo: {
    padding: 50,
    color: '#00A1E0',
  },
  focused: {
    padding: 14,
    color: '#ccc',
  },
  unfocus: {
    padding: 14,
    color: '#666',
  },
  containerMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: '#EE5407',
    position: 'absolute', //Here is the trick
    left: 0,
    bottom: 0, //Here is the trick
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
});

const AppRoutes: React.FC = () => (
  <AppStack.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: () => {
      if (route.name === 'Pesquisar') {
        return <FontAwesomeIcon style={styles.focused} icon={faCloud} />;
      } else if (route.name === 'Conta') {
        return <FontAwesomeIcon style={styles.focused} icon={faUser} />;
      }
    },
    tabBarActiveTintColor: '#666',
    tabBarInactiveTintColor: '#ccc',
  })}
  >
    <AppStack.Screen name="Pesquisar" component={SearchCity} />
    <AppStack.Screen name="Conta" component={Account} />
  </AppStack.Navigator>
);

export default AppRoutes;
