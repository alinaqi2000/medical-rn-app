import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';

export default function AppButton({title, onPress, color}) {
  return (
    <View>
      <Button title={title} onPress={onPress} color={color} />
    </View>
  );
}
