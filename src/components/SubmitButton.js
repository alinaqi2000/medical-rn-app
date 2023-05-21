import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';

const SubmitButton = ({title, onPress, color}) => {
  return (
    <View style={styles.btn}>
      <TouchableOpacity>
        <Button title={title} onPress={onPress} color={color} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  btn:{
    marginTop: 40,
    height: 300
  }
});
export default SubmitButton;
