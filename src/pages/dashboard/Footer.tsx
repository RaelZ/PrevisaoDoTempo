import React from 'react';
import {
  NativeBaseProvider,
  Box,
  Text,
  HStack,
  Center,
  Pressable,
} from 'native-base';
import {
  faHome,
  faUserCircle,
  faCloud,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  menu: {
    color: '#fff',
    padding: 16,
  },
  menuSelected: {
    color: '#fff',
    padding: 14,
  },
});

export default function Footer() {
  const [selected, setSelected] = React.useState(2);
  return (
    <NativeBaseProvider>
      <Box
        style={{
          width: '100%',
          height: 70,
          position: 'absolute', //Here is the trick
          bottom: 0, //Here is the trick}}
        }}
        flex={1}
        bg="white"
        safeAreaBottom 
      >
        <Center flex={1}></Center>
        <HStack bg="darkBlue.400" alignItems="center" shadow={6}>
          <Pressable
            cursor="pointer"
            opacity={selected === 0 ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() => setSelected(0)}
          >
            {selected === 0 ? (
              <Center>
                <FontAwesomeIcon style={styles.menuSelected} icon={faHome} />
                <Text color="white" fontSize={16}>
                  Home
                </Text>
              </Center>
            ) : (
              <Center>
                <FontAwesomeIcon style={styles.menu} icon={faHome} />
                <Text color="white" fontSize={14}>
                  Home
                </Text>
              </Center>
            )}
          </Pressable>
          <Pressable
            cursor="pointer"
            opacity={selected === 1 ? 1 : 0.6}
            py="2"
            flex={1}
            onPress={() => setSelected(1)}
          >
            {selected === 1 ? (
              <Center>
                <FontAwesomeIcon style={styles.menu} icon={faCloud} />
                <Text color="white" fontSize={14}>
                  Pesquisar
                </Text>
              </Center>
            ) : (
              <Center>
                <FontAwesomeIcon style={styles.menuSelected} icon={faCloud} />
                <Text color="white" fontSize={16}>
                  Pesquisar
                </Text>
              </Center>
            )}
          </Pressable>
          <Pressable
            cursor="pointer"
            opacity={selected === 2 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => setSelected(2)}
          >
            {selected === 2 ? (
              <Center>
                <FontAwesomeIcon style={styles.menuSelected} icon={faUserCircle} />
                <Text color="white" fontSize={16}>
                  Conta
                </Text>
              </Center>
            ) : (
              <Center>
                <FontAwesomeIcon style={styles.menu} icon={faUserCircle} />
                <Text color="white" fontSize={14}>
                  Conta
                </Text>
              </Center>
            )}
          </Pressable>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
}
