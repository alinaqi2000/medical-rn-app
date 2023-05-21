import React from 'react';
import {useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

export default function MedicineDetail() {
  const [medName, setMedName] = useState('');
  return (
    <View>
      <TextInput
        placeholder="Medicine Name.."
        onChangeText={text => setMedName(text)}
        style={{
          color: 'red',
          borderWidth: 1,
          width: 230,
          marginLeft: 35,
          borderColor: '#00BFFF',
        }}
        placeholderTextColor="#00BFFF"
      />
    </View>
  );
}
const styles = StyleSheet.create({});
