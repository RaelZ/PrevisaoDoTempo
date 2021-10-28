import React from 'react';
import SearchCity from '../pages/signIn/SearchCity';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../pages/signIn/Login';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet } from 'react-native';
import {
  faCloud,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

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

const AuthStack = createBottomTabNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: () => {
        if (route.name === 'Pesquisar') {
          return <FontAwesomeIcon style={styles.focused} icon={faCloud} />
        } else if (route.name === 'Entrar') {
          return <FontAwesomeIcon style={styles.focused} icon={faUser} />;
        }
      },
      tabBarActiveTintColor: '#666',
      tabBarInactiveTintColor: '#ccc',
    })}
  >
    <AuthStack.Screen name="Pesquisar" component={SearchCity} />
    <AuthStack.Screen name="Entrar" component={Login} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
