import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableNativeFeedback,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';

export default function TimePicker({shows, setShows}) {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <DatePicker
        modal
        shows={shows}
        date={date}
        onConfirm={date => {
          setShows(false);
          setDate(date);
        }}
        onCancel={() => {
          setShows(false);
        }}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#20b2aa',
    borderBottomWidth: 1,
  },
  button: {
    color: 'black',
  },
  btnContainer: {
    marginLeft: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
