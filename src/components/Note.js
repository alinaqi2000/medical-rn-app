import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <View>
      <Text style={{color: 'white'}}>{props.doctorName}</Text>
      <Text style={{color: 'white'}}>{props.speciality}</Text>
      <TouchableOpacity onPress={handleClick} style={{marginLeft: 40}}>
        <Text>
          <MaterialCommunityIcons name="delete" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Note;
