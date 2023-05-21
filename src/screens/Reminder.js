import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppButton from '../components/AppButton';
import {createStackNavigator} from '@react-navigation/stack';
import {colors} from '../../config/color';

export default function Reminder({navigation}) {
  return (
    <View style={styles.main}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../assets/clock1.jpeg')} style={styles.img} />
      </View>
      <View>
        <Text
          style={{
            color: 'grey',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
            marginTop: 10,
          }}>
          Manage your medication
        </Text>
        <Text
          style={{
            color: 'grey',
            fontSize: 15,
            textAlign: 'center',
            marginTop: 10,
            width: 300,
            marginLeft: 30,
            fontWeight: 'bold',
          }}>
          Get reminded about your medications on time and track your health.
        </Text>
      </View>
      <View style={styles.container}></View>

      <TouchableHighlight
        onPress={() => navigation.navigate('AddMedication')}
        underlayColor="white">
        <View style={styles.btn}>
          <Text style={{color: 'white'}}>ADD A MEDICATION</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // top: '40%',
    marginVertical: 20,
  },
  btn: {
    backgroundColor: '#00BFFF',
    height: 50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10%',
    // right: 10,
    borderRadius: 40,
    // left: '33%'
  },

  icon: {
    backgroundColor: '#008b8b',
    right: 10,
    width: 35,
    height: 35,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  img: {
    width: 250,
    height: 250,
    // justifyContent: 'center',
    // alignItems: 'center',
    // left: '30%',
    top: 80,
    marginVertical: 10,
    marginBottom: 80,
  },
});
