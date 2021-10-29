import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth';
import { useFormik } from 'formik';
import {
  Input,
  Stack,
  Button,
  Text,
  NativeBaseProvider,
  Box,
} from 'native-base';
import {
  faCloud,
  faEye,
  faEyeSlash,
  faAt,
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

export default function Login() {
  const { signIn } = useAuth();
  const [show, setShow] = useState(false);
  const [state, setState] = useState(false);
  const handleClick = () => setShow(!show);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        return await signIn(values.email, values.password);
      } catch (err) {
        setState(true);
        return false;
      }
    },
  });

  return (
    <NativeBaseProvider>
      <Stack mt={16} space={4} w="100%" alignItems="center">
        <FontAwesomeIcon style={styles.logo} icon={faCloud} />
        <Text style={{ fontSize: 20, color: '#666' }}>ENTRAR</Text>
        <Box bg="#fff">
          <Input
            w={{ base: '75%', md: '25%' }}
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            bg="transparent"
            InputRightElement={
              <Box m="3">
                <FontAwesomeIcon style={styles.cinza} icon={faAt} />
              </Box>
            }
            placeholder="Email"
          />
        </Box>
        <Box bg="#fff">
          <Input
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            placeholder="Senha"
            type={show ? 'text' : 'password'}
            w={{ base: '75%', md: '25%' }}
            bg="transparent"
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
        </Box>
        {/* <Link href="#">
          <Text>Esqueci minha senha</Text>
        </Link> */}
        {state && <Text color="#EB5236">Email ou senha inválidos!</Text>}
        <Button.Group mx={{ base: 'auto', md: 0 }}>
          {formik.isSubmitting ? (
            <Button style={styles.entrar} disabled>
              <ActivityIndicator color="#fff" />
            </Button>
          ) : (
            <Button style={styles.entrar} onPress={formik.handleSubmit}>
              ENTRAR
            </Button>
          )}
        </Button.Group>
      </Stack>
    </NativeBaseProvider>
  );
}
