import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Modal,
  Pressable,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {connect} from 'react-redux';
import {addAlarm} from '../../../actions/alarm';
import {TextInput} from 'react-native-gesture-handler';
import MedicineDetail from './MedicineDetail';

const TimePicker = (props, navigation) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isDateTimePickerVisible, setisDateTimePickerVisible] = useState(false);
  const [active, setactive] = useState(false);

  const showdateTime = () => {
    setisDateTimePickerVisible(true);
  };

  const hidedateTime = () => {
    setisDateTimePickerVisible(false);
  };

  // const handleModal = () => {
  //   {
  //     setactive(!active);
  //   }
  //   {
  //     showdateTime();
  //   }
  // };

  const handleDatePicker = dateTime => {
    const currentTime = Date.now();
    if (dateTime.getTime() < currentTime) {
      Alert.alert('Please choose future Date');
      hidedateTime();
      return;
    }

    const alarmNotifData = {
      id: makeid(), // Required
      title: 'Alarm Ringing', // Required
      message: 'My Notification Message', // Required
      channel: 'alarm-channel', // Required. Same id as specified in MainApplication's onCreate method
      ticker: 'My Notification Ticker',
      auto_cancel: true, // default: true
      vibrate: true,
      vibration: 100, // default: 100, no vibration if vibrate: false
      small_icon: 'ic_launcher', // Required
      large_icon: 'ic_launcher',
      play_sound: true,
      sound_name: null, // Plays custom notification ringtone if sound_name: null
      color: 'red',
      schedule_once: true, // Works with ReactNativeAN.scheduleAlarm so alarm fires once
      tag: 'some_tag',
      fire_date: Date.now(),
      date: {value: dateTime}, // Date for firing alarm, Required for ReactNativeAN.scheduleAlarm.
    };
    props.add(alarmNotifData);
    hidedateTime();
  };

  const makeid = () => {
    var length = 5;
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          showdateTime();
        }}>
        <Text style={{color: 'white'}}>+ ADD ALARMS</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          setactive(!active);
        }}>
        <Text style={{color: 'white'}}>+ ADD Medicine</Text>
      </TouchableOpacity> */}

      <DatePicker
        modal
        open={isDateTimePickerVisible}
        date={date}
        // onConfirm={date => {
        //   setOpen(false);
        //   setDate(date);
        // }}
        onConfirm={handleDatePicker}
        // onCancel={() => {
        //   setOpen(false);
        // }}
        onCancel={hidedateTime}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={active}
        onRequestClose={() => {
          console.warn('closed');
        }}>
        <View style={styles.container}>
          {/* <View style={styles.View}>
            <Text style={styles.text}>GeeksforGeeks</Text>
            <Button
              title="close"
              onPress={() => {
                setactive(!active);
              }}
            />
          </View> */}
          <MedicineDetail />
          <TouchableOpacity
            onPress={() => {
              setactive(!active);
            }}
            style={styles.btnStyle}>
            <Text style={{color: '#00BFFF'}}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    add: alarmNotifObj => {
      dispatch(addAlarm(alarmNotifObj));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimePicker);
const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: '#00BFFF',
    padding: 15,
    marginLeft: 130,
    top: 10,
    right: 60,
  },
  container: {
    backgroundColor: 'white',
    marginTop: 200,
    paddingVertical: 100,
    width: 300,
    marginLeft: 30,
  },
  btnStyle: {
    top: 90,
    flexDirection: 'row-reverse',
    right: 10,
  },
});
