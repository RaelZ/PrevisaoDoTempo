import React, { useState } from 'react';
import {
  Input,
  Stack,
  Button,
  Text,
  Link,
  NativeBaseProvider,
  Center,
} from 'native-base';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet } from 'react-native';

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

export default function SearchCity() {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3" bg="#DEEEFF">
        <Stack space={4} w="100%" alignItems="center">
          <FontAwesomeIcon style={styles.logo} icon={faCity} />
          <Text style={{ fontSize: 20, color: '#666' }}>Informe a cidade</Text>
          <Input
            w={{ base: '75%', md: '25%' }}
            bg="#eee"
            placeholder="Cidade"
            shadow={3}
          />
          <Button.Group mx={{ base: 'auto', md: 0 }}>
            <Button style={styles.entrar} shadow={5}>
              Procurar
            </Button>
          </Button.Group>
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
}
