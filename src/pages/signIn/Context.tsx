import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth';
import { useFormik } from 'formik';
import { Input, Stack, Button, Text, Link } from 'native-base';
import {
  faCloud,
  faEye,
  faEyeSlash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ActivityIndicator, StyleSheet } from 'react-native';

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

export default function Context() {
  const { signIn } = useAuth();
  const [show, setShow] = useState(false);
  const [state, setState] = useState(false);
  const handleClick = () => setShow(!show);
  const formik = useFormik({
    initialValues: {
      email: 'rael.teste@teste.com',
      password: '1234',
    },
    onSubmit: async (values) => {
      try { return await signIn(values.email, values.password); }
      catch (err) {
        setState(true);
        return false;
      }
    },
  });

  return (
    <Stack space={4} w="100%" alignItems="center">
      <FontAwesomeIcon style={styles.logo} icon={faCloud} />
      <Text style={{ fontSize: 20, color: '#666' }}>Weather View</Text>
      <Input
        w={{ base: '75%', md: '25%' }}
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
        InputRightElement={
          <Button variant="ghost" size="xs" m="1" onPress={handleClick}>
            <FontAwesomeIcon style={styles.cinza} icon={faUser} />
          </Button>
        }
        placeholder="Email"
      />
      <Input
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        placeholder="Senha"
        type={show ? 'text' : 'password'}
        w={{ base: '75%', md: '25%' }}
        InputRightElement={
          <Button variant="ghost" size="xs" m="1" onPress={handleClick}>
            {show ? (
              <FontAwesomeIcon style={styles.cinza} icon={faEye} />
            ) : (
              <FontAwesomeIcon style={styles.cinza} icon={faEyeSlash} />
            )}
          </Button>
        }
      />
      <Link href="#">
        <Text>Esqueci minha senha</Text>
      </Link>
      {state && <Text color="#EB5236">Email ou senha inválidos!</Text>}
      <Button.Group mx={{ base: 'auto', md: 0 }}>
        <Button style={styles.entrar} onPress={formik.handleSubmit}>
          {formik.isSubmitting ? <ActivityIndicator color="#fff" /> : 'ENTRAR'}
        </Button>
        <Button style={styles.criarConta}>CRIAR CONTA</Button>
      </Button.Group>
    </Stack>
  );
}
