import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

export default function AppTextInput({placeholder}) {
  return (
    <View>
      <TextInput placeholder={placeholder} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 280,
    marginBottom: 20,
    backgroundColor: '#F2F2F2',
    paddingLeft: 20,
    color: 'grey',
  },
});
