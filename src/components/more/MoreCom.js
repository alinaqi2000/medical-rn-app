import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableHighlight,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MoreCom(props) {
  return (
    <View>
      <TouchableHighlight
        underlayColor="#E0F2F7"
        onPress={props.onPress}
        style={styles.container2}>
        <View
          style={{flexDirection: 'row', marginLeft: 20, paddingVerical: 10}}>
          <MaterialCommunityIcons name={props.name} size={25} color="#00BFFF" />
          <Text style={styles.text}>{props.title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({
  imgStyle: {
    width: 20,
    height: 20,
  },
  container2: {
    marginTop: 20,
    padding: 10,
  },
  text: {
    fontSize: 15,
    marginLeft: 40,
    top: 3,
    fontWeight: 'bold',
    color: 'grey',
  },
});
