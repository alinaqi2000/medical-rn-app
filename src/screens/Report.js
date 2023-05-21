import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Alert,
} from 'react-native';
export default function Report({navigation}) {
  return (
    <View>
      <View style={{backgroundColor: '#00BFFF', height: 100}}>
        <View style={styles.container2}>
          <Text style={styles.text1}>Weekly Status</Text>
          <Text style={styles.text2}>Nov 12 - 19, 2022</Text>
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: 70}}>
        <Image source={require('../assets/notebook.gif')} style={styles.img} />
        <Text style={{fontSize: 20, color: 'black', fontWeight: '600'}}>
          Nothing to report yet
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#BDC3C7',
            fontWeight: '600',
            marginTop: 10,
          }}>
          Try selecting different dates or meds
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableHighlight
          underlayColor="#81DAF5"
          style={styles.btn}
          onPress={() => navigation.navigate('Add Medicine')}>
          <Text style={{color: 'white'}}>ADD A MED</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container2: {
    marginTop: 30,
    marginLeft: 10,
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  text2: {
    color: 'white',
  },
  img: {
    height: 200,
    width: 250,
  },
  btn: {
    backgroundColor: '#00BFFF',
    paddingHorizontal: 100,
    marginTop: '20%',
    paddingVertical: 15,
    borderRadius: 40,
  },
});
