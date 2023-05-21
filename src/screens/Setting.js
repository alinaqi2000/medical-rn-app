import React, {useState} from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {createAlarm} from 'react-native-simple-alarm';
import DatePicker from 'react-native-date-picker';
import {getAlarmById} from 'react-native-simple-alarm';

export default function Setting() {
  const [date, setDate] = useState(new Date());
  const [activate, setActivate] = useState(false);

  const setAlarm = async () => {
    await createAlarm({
      active: true,
      date: date,
      message: 'hey',
      snooze: 1,
    });
  };

  const allAlarms = async () => {
    let id = '07699912-87d9-11ea-bc55-0242ac130003';

    try {
      const alarm = await getAlarmById(id);
      console.log(alarm);
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <DatePicker
        date={date}
        onDateChange={setDate}
        style={{marginBottom: 80}}
      />
      <Text style={{color: 'red'}}>{String(date)}</Text>
      <Button title="Set alarm" onPress={setAlarm} />
      <View style={{marginTop: 20}}>
        <Button title="Get alarm" onPress={allAlarms} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
