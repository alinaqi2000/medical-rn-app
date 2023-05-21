import React from 'react';
import {View, Text, Image, StyleSheet, TouchableHighlight} from 'react-native';

export default function Appointments({navigation}) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/calender.gif')} style={styles.img} />
      <Text style={styles.text}>Manage your appointments</Text>
      <Text style={styles.text2}>
        List your appointments and get {'\n'} a reminder before time.
      </Text>
      <TouchableHighlight
        underlayColor="#81DAF5"
        onPress={() => navigation.navigate('Add Appointment')}
        style={styles.btn}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          Add an appointment
        </Text>
      </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
  },
  img: {
    width: 350,
    height: 200,
    marginBottom: 40,
  },
  text: {
    color: 'grey',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text2: {
    color: 'grey',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 120,
  },
  btn: {
    backgroundColor: '#00BFFF',
    paddingHorizontal: 80,
    paddingVertical: 15,
    borderRadius: 40,
  },
});
