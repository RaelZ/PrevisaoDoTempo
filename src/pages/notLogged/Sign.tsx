import React, { useState } from 'react';
import { Button, NativeBaseProvider, Center } from 'native-base';
import Login from './Login';
import SignUp from './SignUp';

export default function Sign() {
  const [sign, setSign] = useState(true);
  return (
    <NativeBaseProvider>
      <Center pt={12} flex={1} px="3" bg="#DEEEFF">
        <Button.Group mx={{ base: 'auto', md: 0 }}>
          {sign ? (
            <Button
              style={{ backgroundColor: '#00A1E0' }}
              onPress={() => setSign(true)}
            >
              LOGIN
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: '#AFDEFF' }}
              onPress={() => setSign(true)}
            >
              LOGIN
            </Button>
          )}
          {sign ? (
            <Button
              style={{ backgroundColor: '#AFDEFF' }}
              onPress={() => setSign(false)}
            >
              CRIAR CONTA
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: '#00A1E0' }}
              onPress={() => setSign(false)}
            >
              CRIAR CONTA
            </Button>
          )}
        </Button.Group>
        {sign ? <Login /> : <SignUp />}
      </Center>
    </NativeBaseProvider>
  );
}
