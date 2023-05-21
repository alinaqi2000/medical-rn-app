import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Scan from '../components/Scan';

export default function QrCode() {
  return (
    <View>
      <Scan />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    top: '20%',
    left: '10%',
  },
  btnCon: {
    padding: 20,
    backgroundColor: '#00BFFF',
    width: 120,
    height: 120,
    justifyContent: 'center',
    borderRadius: 60,
    alignItems: 'center',
  },
});
