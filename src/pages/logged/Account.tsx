import {
  faCity,
  faCloud,
  faCloudMoon,
  faCloudRain,
  faCloudSun,
  faIcicles,
  faMoon,
  faPooStorm,
  faRedo,
  faSmog,
  faSnowflake,
  faSun,
  faThermometerHalf,
  faTimes,
  faTint,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  Heading,
  NativeBaseProvider,
  VStack,
  Button,
  ScrollView,
  Box,
  Flex,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { authApi } from '../../api/authApi';
import { weatherView } from '../../api/weatherView';
import { useAuth } from '../../contexts/Auth';
import {
  User,
  FavoriteCities,
  FavoriteCitiesInfo,
  FavCity,
} from '../../models';

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DEEEFF',
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
    marginBottom: 0,
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
  logoutButton: {
    borderRadius: 50,
  },
  temp: {
    padding: 14,
    color: '#FF4D00',
    margin: 5,
  },
  water: {
    padding: 14,
    color: '#00A1E0',
    margin: 5,
  },
  city: {
    padding: 24,
    color: '#00A1E0',
    marginRight: 10,
  },
});
const list: FavoriteCities[] = [];

const Account: React.FC = () => {
  const { signOut, user, favoriteCities, favoriteCitiesInfo, favoriteCity } =
    useAuth();
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
  async function realod() {
    list.splice(0, list.length);
    await favoriteCity();
  }
  async function removeFav(city) {
    await authApi.removeFavCities(city);
    realod();
  }

  useEffect(() => {
    list.splice(0, list.length);
    getCities();
    setLoggedUser(user);
  }, [loggedUser, favoriteCities, favoriteCitiesInfo]);

  const getCities = async () => {
    const listWeather = [favoriteCitiesInfo];
    console.log('listWeather: ', listWeather[0].favoriteCityInfo);
    list.push(favoriteCities);
    setCitiesList(
      <>
        {list[0].length !== 0 ? (
          <Text style={{ fontSize: 18, color: '#444' }}>
            Essas são as suas cidades favoritas!
          </Text>
        ) : (
          <Text style={{ fontSize: 18, color: '#444' }}>
            Você não possuí cidades favoritas!
          </Text>
        )}
        {list[0].map((cities, i) => {
          return (
            <Box
              overflow="hidden"
              mb={2}
              mt={2}
              p={4}
              w="80"
              bg="#EDEFFF"
              shadow={2}
              rounded="lg"
              key={cities.id}
            >
              <Flex direction="row" w="100%">
                <Box justifyContent="center" w="20%">
                  {listWeather[0].favoriteCityInfo[i].condition_slug ===
                  'rain' ? (
                    <FontAwesomeIcon style={styles.city} icon={faCloudRain} />
                  ) : null}
                  {listWeather[0].favoriteCityInfo[i].condition_slug ===
                  'storm' ? (
                    <FontAwesomeIcon style={styles.city} icon={faPooStorm} />
                  ) : null}
                  {listWeather[0].favoriteCityInfo[i].condition_slug ===
                  'snow' ? (
                    <FontAwesomeIcon style={styles.city} icon={faSnowflake} />
                  ) : null}
                  {listWeather[0].favoriteCityInfo[i].condition_slug ===
                  'hail' ? (
                    <FontAwesomeIcon style={styles.city} icon={faIcicles} />
                  ) : null}
                  {listWeather[0].favoriteCityInfo[i].condition_slug ===
                  'fog' ? (
                    <FontAwesomeIcon style={styles.city} icon={faSmog} />
                  ) : null}
                  {listWeather[0].favoriteCityInfo[i].condition_slug ===
                  'clear_day' ? (
                    <FontAwesomeIcon style={styles.city} icon={faSun} />
                  ) : null}
                  {listWeather[0].favoriteCityInfo[i].condition_slug ===
                  'clear_night' ? (
                    <FontAwesomeIcon style={styles.city} icon={faMoon} />
                  ) : null}
                  {listWeather[0].favoriteCityInfo[i].condition_slug ===
                  'cloud' ? (
                    <FontAwesomeIcon style={styles.city} icon={faCloud} />
                  ) : null}
                  {listWeather[0].favoriteCityInfo[i].condition_slug ===
                  'cloudly_day' ? (
                    <FontAwesomeIcon style={styles.city} icon={faCloudSun} />
                  ) : null}
                  {listWeather[0].favoriteCityInfo[i].condition_slug ===
                  'cloudly_night' ? (
                    <FontAwesomeIcon style={styles.city} icon={faCloudMoon} />
                  ) : null}
                  {listWeather[0].favoriteCityInfo[i].condition_slug ===
                  'none_day' ? (
                    <FontAwesomeIcon style={styles.city} icon={faCity} />
                  ) : null}
                  {listWeather[0].favoriteCityInfo[i].condition_slug ===
                  'none_night' ? (
                    <FontAwesomeIcon style={styles.city} icon={faCity} />
                  ) : null}
                </Box>
                <Box justifyContent="center" w="55%">
                  <Text>{`${listWeather[0].favoriteCityInfo[i].city}`}</Text>
                  <Text>{`${listWeather[0].favoriteCityInfo[i].currently}`}</Text>
                  <Text>{`${listWeather[0].favoriteCityInfo[i].description}`}</Text>
                </Box>
                <Box justifyContent="center">
                  <FontAwesomeIcon
                    style={styles.temp}
                    icon={faThermometerHalf}
                  />
                  <FontAwesomeIcon style={styles.water} icon={faTint} />
                </Box>
                <Box justifyContent="center" w="25%">
                  <Text>{`${listWeather[0].favoriteCityInfo[i].temp}ºC`}</Text>
                  <Text />
                  <Text>{`${listWeather[0].favoriteCityInfo[i].humidity}m³`}</Text>
                </Box>
              </Flex>
              <Button
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  backgroundColor: '#FFEFAA00',
                }}
                bg="transparent"
                onPress={() => {
                  removeFav(cities.cityId);
                }}
                leftIcon={<FontAwesomeIcon icon={faTimes} />}
              />
            </Box>
          );
        })}
      </>
    );
  };
  const capitalize = (str) => {
    if (typeof str !== 'string') {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.substr(1);
  };

  return (
    <NativeBaseProvider>
      <View style={styles.containerMain}>
        <ScrollView style={styles.bodyView}>
          <NativeBaseProvider>
            <VStack space={4} alignItems="center">
              <Heading
                style={{ fontSize: 28, color: '#1a1a1a' }}
                textAlign="center"
                mb="3"
              >
                Olá, {capitalize(loggedUser.name)}
              </Heading>
              {citiesList}
              <Button.Group mx={{ base: 'auto', md: 0 }}>
                <Button
                  style={styles.logoutButton}
                  onPress={handleSignOut}
                  mt="5"
                >
                  SAIR
                </Button>
                <Button
                  onPress={() => realod()}
                  mt="5"
                  style={styles.logoutButton}
                  leftIcon={
                    <FontAwesomeIcon style={{ color: '#fff' }} icon={faRedo} />
                  }
                />
              </Button.Group>
            </VStack>
          </NativeBaseProvider>
          <Box h="20" />
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
};

export default Account;
