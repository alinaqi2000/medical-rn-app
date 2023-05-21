import React from 'react';
import {Calendar} from 'react-native-calendars';
import {View} from 'react-native';

export default function AppCalender() {
  return (
    <View>
      <Calendar onDayPress={() => console.log('selected day', day)} />
    </View>
  );
}
