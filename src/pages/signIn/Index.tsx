import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Context from './Context';
import Footer from './Footer';

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
    color: '#BFE5E6',
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

const SignIn: React.FC = () => {
  return (
    <NativeBaseProvider>
      <View style={styles.containerMain}>
        <View>
          <Context />
        </View>
        <View style={styles.bottomView}>
          <Footer />
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default SignIn;
