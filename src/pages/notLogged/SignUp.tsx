import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth';
import { useFormik } from 'formik';
import {
  Input,
  Stack,
  Button,
  Text,
  Link,
  NativeBaseProvider,
  Center,
  Box,
} from 'native-base';
import {
  faCloud,
  faEye,
  faEyeSlash,
  faUser,
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

export default function SignUp() {
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [state, setState] = useState(false);
  const handleClickPassword = () => setShowPassword(!showPassword);
  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showPassword);
  const formik = useFormik({
    initialValues: {
      user: '',
      email: '',
      password: '',
      confirmPassword: '',
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
      <Stack mt={8} space={4} w="100%" alignItems="center">
        <FontAwesomeIcon style={styles.logo} icon={faCloud} />
        <Text style={{ fontSize: 20, color: '#666' }}>CRIAR CONTA</Text>
        <Input
          w={{ base: '75%', md: '25%' }}
          value={formik.values.user}
          onChangeText={formik.handleChange('user')}
          bg="#eee"
          InputRightElement={
            <Box m="3">
              <FontAwesomeIcon style={styles.cinza} icon={faUser} />
            </Box>
          }
          placeholder="Usuário"
        />
        <Input
          w={{ base: '75%', md: '25%' }}
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          bg="#eee"
          InputRightElement={
            <Box m="3">
              <FontAwesomeIcon style={styles.cinza} icon={faAt} />
            </Box>
          }
          placeholder="Email"
        />
        <Input
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          placeholder="Senha"
          type={showPassword ? 'text' : 'password'}
          w={{ base: '75%', md: '25%' }}
          bg="#eee"
          InputRightElement={
            <Button
              variant="ghost"
              size="xs"
              m="1"
              onPress={handleClickPassword}
            >
              {showPassword ? (
                <FontAwesomeIcon style={styles.cinza} icon={faEye} />
              ) : (
                <FontAwesomeIcon style={styles.cinza} icon={faEyeSlash} />
              )}
            </Button>
          }
        />
        <Input
          value={formik.values.confirmPassword}
          onChangeText={formik.handleChange('confirmPassword')}
          placeholder="Confirmar senha"
          type={showConfirmPassword ? 'text' : 'password'}
          w={{ base: '75%', md: '25%' }}
          bg="#eee"
          InputRightElement={
            <Button
              variant="ghost"
              size="xs"
              m="1"
              onPress={handleClickConfirmPassword}
            >
              {showConfirmPassword ? (
                <FontAwesomeIcon style={styles.cinza} icon={faEye} />
              ) : (
                <FontAwesomeIcon style={styles.cinza} icon={faEyeSlash} />
              )}
            </Button>
          }
        />
        {state && <Text color="#EB5236">Email ou senha inválidos!</Text>}
        <Button.Group mx={{ base: 'auto', md: 0 }}>
          <Button style={styles.entrar} onPress={formik.handleSubmit}>
            {formik.isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              'CRIAR CONTA'
            )}
          </Button>
        </Button.Group>
      </Stack>
    </NativeBaseProvider>
  );
}
