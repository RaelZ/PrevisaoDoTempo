import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth';
import { Stack, Button, NativeBaseProvider, Center } from 'native-base';
import { StyleSheet } from 'react-native';
import Login from './Login';
import SignUp from './SignUp';

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
  cinza: {
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

export default function Sign() {
  const [sign, setSign] = useState(false);
  return (
    <NativeBaseProvider>
      <Center pt={12} flex={1} px="3" bg="#DEEEFF">
          <Button.Group mx={{ base: 'auto', md: 0 }}>
            <Button onPress={() => setSign(true)}>LOGIN</Button>
            <Button onPress={() => setSign(false)}>CRIAR CONTA</Button>
          </Button.Group>
        {sign ? <Login /> : <SignUp />}
      </Center>
    </NativeBaseProvider>
  );
}
