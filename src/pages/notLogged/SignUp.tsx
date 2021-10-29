import React, { useState } from 'react';
import { useAuth } from '../../contexts/Auth';
import { useFormik } from 'formik';
import {
  Input,
  Stack,
  Button,
  Text,
  NativeBaseProvider,
  ScrollView,
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
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notUser, setNotUser] = useState(false);
  const [notEmail, setNotEmail] = useState(false);
  const [notPassword, setNotPassword] = useState(false);
  const [notPossible, setPossible] = useState(false);
  const [account, setAccount] = useState(false);
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
        setPossible(false);
        if (values.user === '') {
          return setNotUser(true);
        }
        function validateEmail(email) {
          var re = /\S+@\S+\.\S+/;
          return re.test(email);
        }
        const email = validateEmail(values.email);
        if (!email) {
          return setNotEmail(true);
        }
        if (
          values.password !== values.confirmPassword &&
          values.password === '' &&
          values.confirmPassword === ''
        ) {
          return setNotPassword(true);
        }
        await signUp(values.user, values.email, values.password);
        return setAccount(true);
      } catch (err) {
        console.log('a');
        setPossible(true);
        return false;
      }
    },
  });

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Stack mt={8} space={4} w="100%" alignItems="center">
          <FontAwesomeIcon style={styles.logo} icon={faCloud} />
          <Text style={{ fontSize: 20, color: '#666' }}>CRIAR CONTA</Text>
          <Box bg="#fff" w={{ base: '80%', md: '25%' }}>
            <Input
              isRequired={true}
              w={{ base: '100%', md: '25%' }}
              value={formik.values.user}
              onChangeText={formik.handleChange('user')}
              onFocus={() => setNotUser(false)}
              bg="transparent"
              InputRightElement={
                <Box m="3">
                  <FontAwesomeIcon style={styles.cinza} icon={faUser} />
                </Box>
              }
              placeholder="Usuário"
            />
          </Box>
          <Box bg="#fff" w={{ base: '80%', md: '25%' }}>
            <Input
              isRequired={true}
              w={{ base: '100%', md: '25%' }}
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              onFocus={() => setNotEmail(false)}
              bg="transparent"
              InputRightElement={
                <Box m="3">
                  <FontAwesomeIcon style={styles.cinza} icon={faAt} />
                </Box>
              }
              placeholder="Email"
            />
          </Box>
          <Box bg="#fff" w={{ base: '80%', md: '25%' }}>
            <Input
              isRequired={true}
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              onFocus={() => {
                if (formik.values.confirmPassword !== formik.values.password) {
                  setNotPassword(true);
                } else {
                  setNotPassword(false);
                }
              }}
              placeholder="Senha"
              type={showPassword ? 'text' : 'password'}
              w={{ base: '100%', md: '25%' }}
              bg="transparent"
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
          </Box>
          <Box bg="#fff" w={{ base: '80%', md: '25%' }}>
            <Input
              isRequired={true}
              value={formik.values.confirmPassword}
              onChangeText={formik.handleChange('confirmPassword')}
              onFocus={() => {
                if (formik.values.confirmPassword !== formik.values.password) {
                  setNotPassword(true);
                } else {
                  setNotPassword(false);
                }
              }}
              placeholder="Confirmar senha"
              type={showConfirmPassword ? 'text' : 'password'}
              w={{ base: '100%', md: '25%' }}
              bg="transparent"
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
          </Box>
          {account && <Text color="#00FF45">Conta criada com sucesso!</Text>}
          {notPossible && (
            <Text color="#EB5236">Não foi possível criar a conta!</Text>
          )}
          {notUser && (
            <Text color="#EB5236">Por favor informe um usuário!</Text>
          )}
          {notEmail && (
            <Text color="#EB5236">Por favor informe um email válido!</Text>
          )}
          {notPassword && (
            <Text color="#EB5236">As senhas não correspondem!</Text>
          )}
          <Button.Group mx={{ base: 'auto', md: 0 }}>
            <Button
              style={styles.entrar}
              onPress={formik.handleSubmit}
              disabled={
                notUser === true || notEmail === true || notPassword === true
              }
            >
              {formik.isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                'CRIAR CONTA'
              )}
            </Button>
          </Button.Group>
        </Stack>
      </ScrollView>
    </NativeBaseProvider>
  );
}
