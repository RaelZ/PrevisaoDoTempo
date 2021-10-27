import {
  Center,
  Heading,
  NativeBaseProvider,
  VStack,
  Button,
  ScrollView,
  Box,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/Auth';
import Footer from './Footer';
import { User, FavoriteCities } from '../../models';

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CEEEFF',
  },
  bottomView: {
    width: '100%',
    height: 50,
    position: 'absolute', //Here is the trick
    left: 0,
    bottom: 0, //Here is the trick
  },
  bodyView: {
    width: '100%',
    height: '100%',
    paddingTop: 50,
    marginBottom: 0
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
  logoutButton: {
    borderRadius: 50,
  },
});
const list: FavoriteCities[] = [];

const Dashboard: React.FC = () => {
  const { signOut, user, favoriteCities } = useAuth();
  const [loggedUser, setLoggedUser] = useState<User>({
    id: null as any,
    name: null as any,
    email: null as any,
    createdAt: null as any,
    updatedAt: null as any,
    token: null as any,
  });
  const [citiesList, setCitiesList] = useState(
    <ActivityIndicator color="#000" />
  );
  function handleSignOut() {
    signOut();
    list.splice(0, list.length);
  }

  useEffect(() => {
    if (list.length >= 0) {
      list.splice(0, list.length);
    }
    getCities();
    setLoggedUser(user);
  }, [loggedUser, favoriteCities]);

  const getCities = async () => {
    list.push(favoriteCities);
    console.log(list);
    setCitiesList(
      list[0].map((cities) => (
          <Center
            w="80"
            h="20"
            bg="#DDEEFF"
            rounded="md"
            shadow={5}
            key="cities.id"
          >
            <Text>Cidade: {cities.name}</Text>
          </Center>
        ))
    );
  };

  return (
    <NativeBaseProvider>
      <View style={styles.containerMain}>
        <ScrollView style={styles.bodyView}>
          <NativeBaseProvider>
            <VStack space={4} alignItems="center">
              <Heading textAlign="center" mb="10">
                Olá, {loggedUser.name}
              </Heading>
              <Text style={{ fontSize: 18, color: '#444' }}>
                Essas são as suas cidades favoritas!
              </Text>
              {citiesList}
              <Button
                shadow={3}
                style={styles.logoutButton}
                onPress={handleSignOut}
                mt="10"
              >
                SAIR
              </Button>
            </VStack>
          </NativeBaseProvider>
          <Box h="150" />
        </ScrollView>
        <View style={styles.bottomView}>
          <Footer />
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default Dashboard;
