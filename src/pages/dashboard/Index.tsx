import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/Auth';
import Footer from './Footer';

const styles = StyleSheet.create({
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

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  function handleSignOut() {
    signOut();
  }

  return (
    <View style={styles.containerMain}>
      <Button title="Logout" onPress={handleSignOut} />
      <View style={styles.bottomView}>
        <Footer />
      </View>
    </View>
  );
};

export default Dashboard;
