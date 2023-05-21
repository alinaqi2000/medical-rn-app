import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import ButtonCom from '../components/SubmitButton';
import GlobalFont from 'react-native-global-font';

const FirstScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('LoginScreen');
  }, 3000);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logoo.png')} style={styles.imgStyle} />
    </View>
  );
};
const styles = StyleSheet.create({
  imgStyle: {
    width: '100%',
    height: 350,
    top: 200,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default FirstScreen;
