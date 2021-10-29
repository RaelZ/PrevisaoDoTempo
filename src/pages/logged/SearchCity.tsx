import React, { useEffect, useState } from 'react';
import {
  Input,
  Stack,
  Button,
  Text,
  NativeBaseProvider,
  Center,
  Box,
  Flex,
} from 'native-base';
import {
  faCity,
  faThermometerHalf,
  faTint,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { CityInfo, FavCity } from '../../models';
import { weatherView } from '../../api/weatherView';

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
  starNot: {
    color: '#ccc',
    position: 'absolute',
    right: -10,
    top: -10,
  },
  starYes: {
    color: '#FFCE00',
    position: 'absolute',
    right: -10,
    top: -10,
  },
});

export default function SearchCity() {
  const [weather, setWeather] = useState<CityInfo>({
    city: null as any,
    condition_code: null as any,
    currently: null as any,
    date: null as any,
    description: null as any,
    wind_speedy: null as any,
    humidity: null as any,
    temp: null as any,
    latitude: null as any,
    longitude: null as any,
    time: null as any,
  });
  const [cityWeather, setCityWeather] = useState<Element | null>(null);
  const [city, setCity] = useState(false);
  const [fav, setFav] = useState(false);
  const handleStar = () => {
    setFav(!fav);
  };
  const formik = useFormik({
    initialValues: {
      city: '',
    },
    onSubmit: async (values) => {
      try {
        setFav(false);
        setCityWeather(null);
        setCity(false);
        setWeather({
          city: null as any,
          condition_code: null as any,
          currently: null as any,
          date: null as any,
          description: null as any,
          wind_speedy: null as any,
          humidity: null as any,
          temp: null as any,
          latitude: null as any,
          longitude: null as any,
          time: null as any,
        });
        const response = await weatherView.getCities(values.city);
        setWeather(response);
        setCity(true);
      } catch (err) {
        console.log('F');
        return false;
      }
    },
  });

  useEffect(() => {
    async function addFav(city) {
      const response = [];
      console.log(city);
      response.push(await weatherView.getFavCity(city));
      console.log(response);
      await weatherView.addFavCities(city, response[0].woeid);
    }
    async function removeFav() {
      const response: FavCity = await weatherView.getFavCity(
        formik.values.city
      );
      await weatherView.removeFavCities(response.woeid);
    }
    if (weather) {
      setCityWeather([
        <Box
          overflow="hidden"
          mb={2}
          mt={2}
          p={4}
          w="80"
          bg="#EDEFFF"
          shadow={2}
          rounded="lg"
          key={weather.latitude}
        >
          <Flex direction="row" w="10%" h="1%"></Flex>
          <Flex direction="row" w="100%">
            <Box justifyContent="center" w="20%">
              <FontAwesomeIcon style={styles.city} icon={faCity} />
            </Box>
            <Box justifyContent="center" w="50%">
              <Text>{`${weather.city}`}</Text>
              <Text>{`${weather.currently}`}</Text>
              <Text>{`${weather.description}`}</Text>
            </Box>
            <Box justifyContent="center">
              <FontAwesomeIcon style={styles.temp} icon={faThermometerHalf} />
              <FontAwesomeIcon style={styles.water} icon={faTint} />
            </Box>
            <Box justifyContent="center" w="30%">
              <Text>{`${weather.temp}ºC`}</Text>
              <Text />
              <Text>{`${weather.humidity}m³`}</Text>
            </Box>
          </Flex>
          {!fav ? (
            <Button
              style={{
                position: 'absolute',
                right: 3,
                top: 3,
                backgroundColor: '#FFEFAA00',
              }}
              bg="transparent"
              onPress={() => {
                handleStar();
                addFav(weather.city);
              }}
              leftIcon={
                <FontAwesomeIcon style={styles.starNot} icon={faStar} />
              }
            />
          ) : (
            <Button
              style={{
                position: 'absolute',
                right: 3,
                top: 3,
                backgroundColor: '#FFEFAA00',
              }}
              bg="transparent"
              onPress={() => {
                handleStar();
                removeFav();
              }}
              leftIcon={
                <FontAwesomeIcon style={styles.starYes} icon={faStar} />
              }
            />
          )}
        </Box>,
      ]);
    }
  }, [weather, fav]);

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3" bg="#DEEEFF">
        <Stack space={4} w="100%" alignItems="center">
          <FontAwesomeIcon style={styles.logo} icon={faCity} />
          <Text style={{ fontSize: 20, color: '#666' }}>INFORME A CIDADE</Text>
          <Box bg="#fff" w={{ base: '80%', md: '25%' }}>
            <Input
              w={{ base: '100%', md: '25%' }}
              bg="transparent"
              value={formik.values.city}
              onChangeText={formik.handleChange('city')}
              placeholder="Cidade"
            />
          </Box>
          <Button.Group mx={{ base: 'auto', md: 0 }}>
            <Button onPress={formik.handleSubmit} style={styles.entrar}>
              PROCURAR
            </Button>
          </Button.Group>
          {city ? cityWeather : null}
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
}
