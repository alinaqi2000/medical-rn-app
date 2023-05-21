import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppButton from '../components/AppButton';

export default function Doctor({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/doctor.gif')}
        style={{
          width: 300,
          height: 300,
          marginBottom: 100,
          marginLeft: 30,
          marginTop: 50,
        }}
      />
      <Text style={styles.text1}>List your doctors</Text>
      <Text style={styles.text2}>
        Keep a list of your healthcare advicers to easily set appointments, get
        in touch and send status reports
      </Text>
      {/* <TouchableNativeFeedback
        style={styles.btn}
        onPress={() => navigation.navigate('AddDoctor')}>
        <Text style={{textAlign: 'center', color: 'white'}}>ADD A DOCTOR</Text>
      </TouchableNativeFeedback> */}

      <TouchableHighlight
        onPress={() => navigation.navigate('Add Doctor')}
        underlayColor="#85C1E9"
        style={styles.btn}>
        <Text style={{color: 'white'}}>ADD A DOCTOR</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  text1: {
    color: '#00BFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    bottom: 60,
  },
  text2: {
    color: '#00BFFF',
    width: 300,
    textAlign: 'center',
    left: 30,
    bottom: 50,
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
});
