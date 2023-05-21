import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AppointmentDetails(props) {
  return (
    <View>
      <View style={styles.container}>
        <MaterialCommunityIcons name={props.name} size={25} color="#00BFFF" />
        <TouchableHighlight
          underlayColor="#E0F2F7"
          onPress={props.onPress}
          style={styles.container2}>
          <Text style={styles.text}>{props.title}</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    color: 'grey',
    marginTop: 3,
  },
  container2: {
    marginLeft: 40,
  },
});
