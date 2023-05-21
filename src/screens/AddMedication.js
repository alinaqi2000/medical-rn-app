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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AddMedication({navigation}) {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.container}>
        <Image
          source={require('../assets/clock.gif')}
          resizeMode="contain"
          style={{width: 450, height: 450}}
        />
        <View style={styles.container2}>
          <Text style={styles.text1}>Currently There Is No</Text>
          <Text style={styles.text2}>Medicine Added</Text>
          <Text style={styles.text3}>
            Add new medicine to enjoy this feature!
          </Text>
        </View>
        <View style={styles.btnCon}>
          <TouchableHighlight
            underlayColor="#2ECCFA"
            style={styles.btn}
            onPress={() => navigation.navigate('ReminderSet')}>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 40, bottom: 9}}>+</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    bottom: 100,
  },
  text1: {
    color: '#00BFFF',
    fontSize: 27,
    fontWeight: 'bold',
    textShadowColor: 'grey',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  text2: {
    color: '#00BFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginLeft: '8%',
    textShadowColor: 'grey',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  text3: {
    color: '#00BFFF',
    fontSize: 15,
    textShadowColor: 'grey',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  img: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  btn: {
    backgroundColor: '#00BFFF',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    shadowOpacity: 5.9,
    elevation: 10,
    shadowRadius: 3,
  },
  btnCon: {
    marginLeft: '70%',
  },
});
