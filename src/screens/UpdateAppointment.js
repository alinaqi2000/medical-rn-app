import React from 'react';
import {useState, useRef} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  Alert,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import notifee, {TriggerType} from '@notifee/react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppointmentDetails from '../components/more/AppointmentDetails';
import {colors} from '../../config/color';
import axios from 'axios';
import {link} from '../../serve';

export default function UpdateAppointment({navigation, route}) {
  const {updateId} = route.params;
  const getDetails = type => {
    if (route.params) {
      switch (type) {
        case 'title':
          return route.params.title;
        case 'date':
          return route.params.date;
        case 'dates':
          return route.params.location;
        case 'notes':
          return route.params.notes;
      }
    }
    return '';
  };

  const [title, setTitle] = useState(getDetails('title'));
  const [titleMsg, setTitleMsg] = useState(false);
  const [location, setLocation] = useState(getDetails('location'));
  const [locationMsg, setlocationMsg] = useState(false);
  const [notes, setNotes] = useState(getDetails('notes'));
  const [notesMsg, setnotesMsg] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [doctorModal, setDoctorModal] = useState(false);
  const [calendarModal, setCalendarModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateMsg, setdateMsg] = useState(false);
  const [dates, setDates] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(colors.white);
  const [activate, setActivate] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleFocus2 = () => {
    setIsFocused2(true);
  };
  const handleBlur2 = () => {
    setIsFocused2(false);
  };
  const handleFocus3 = () => {
    setIsFocused3(true);
  };
  const handleBlur3 = () => {
    setIsFocused3(false);
  };

  const opentimer = () => {
    setTimeout(() => {
      Alert.alert('Appointment is updated');
    }, 3000);
  };
  const closetimer = () => {
    setTimeout(() => {
      setActivate(false);
    }, 3000);
  };

  const handleUpdate = async id => {
    var errorFlag = false;
    if (title) {
      errorFlag = true;
      setTitleMsg(false);
    } else {
      errorFlag = false;
      setTitleMsg(true);
    }

    if (date) {
      errorFlag = true;
      setdateMsg(false);
    } else {
      errorFlag = false;
      setdateMsg(true);
    }

    // if (dates) {
    //   errorFlag = true;
    //   setTitleMsg(false);
    // } else {
    //   errorFlag = false;
    //   setTitleMsg(true);
    // }

    if (location) {
      errorFlag = true;
      setlocationMsg(false);
    } else {
      errorFlag = false;
      setTitleMsg(true);
    }

    if (notes) {
      errorFlag = true;
      setnotesMsg(false);
    } else {
      errorFlag = false;
      setnotesMsg(false);
    }
    opentimer();
    setActivate(true);
    closetimer();
    setColor(colors.blue);
    onReminder();
    console.log(`URl           ${link}update-appointment/${updateId}`);

    console.log({
      title: title,
      date: date,
      location: location,
      notes: notes,
    });
    console.log(updateId);

    try {
      const res = await axios.put(
        `${link}update-appointment/${updateId}`,
        {
          title: title,
          date: date,
          location: location,
          notes: notes,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (res?.data) {
        console.log('Response  ', res?.data);
      }
    } catch (error) {
      console.log('Error in line 36  ', error?.response);
    }
  };

  const onReminder = async () => {
    // const date = new Date(Date.now());
    // date.setSeconds(date.getSeconds() * 2);
    let cDay = dates.getDate();
    let cMonth = dates.getMonth() + 1;
    let cYear = dates.getFullYear();
    let cHours = dates.getHours();
    const formattedHours = (cHours % 12).toString().padStart(2, '0');
    let cMinutes = dates.getMinutes();
    const text = `At + ${
      '<b>' +
      cDay +
      '/' +
      cMonth +
      '/' +
      cYear +
      '(' +
      formattedHours +
      ':' +
      cMinutes +
      ')'
    }`;

    const channelId = await notifee.createChannel({
      id: 'sound',
      name: 'Default Channel',
      sound: 'doorbell',
    });

    await notifee.displayNotification({
      title: 'Reminder',
      body: 'You have set the reminder',
      android: {
        channelId,
        sound: 'doorbell',
      },
    });
    notifee
      .getTriggerNotificationIds()
      .then(ids => console.log('All trigger notifications: ', ids));

    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: text,
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
          sound: 'doorbell',
        },
      },
      {type: TriggerType.TIMESTAMP, timestamp: dates.getTime()},
    );
  };

  const goToAppointmentDetails = () => {
    navigation.navigate('Appointment Details', {
      title,
      date,
      location,
      notes,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TextInput
        placeholder="Appointment Title"
        placeholderTextColor="#969696"
        // style={styles.input}
        onChangeText={text => setTitle(text)}
        defaultValue={title}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          borderBottomColor: isFocused ? '#00BFFF' : '#6E6E6E',
          borderBottomWidth: 1,
          left: 20,
          fontSize: 22,
          color: 'gray',
          borderBottomWidth: 2,
          borderColor: '#808080',
          width: 325,
          marginTop: 50,
          marginBottom: 30,
        }}
      />
      {titleMsg && (
        <Text style={{color: 'red', textAlign: 'center'}}>
          {'Appointment title is required'}
        </Text>
      )}
      <Text style={{color: 'red'}}>{updateId}</Text>
      {/* <View style={styles.container2}>
        <AppointmentDetails
          onPress={() => setDoctorModal(true)}
          name="doctor"
          title="Select a doctor"
        />
        <TouchableWithoutFeedback onPress={() => setDoctorModal(true)}>
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color="grey"
            style={{marginLeft: 150, marginTop: 5}}
          />
        </TouchableWithoutFeedback>
      </View> */}

      <View style={styles.container2}>
        <AppointmentDetails
          onPress={() => setCalendarModal(true)}
          name="map-marker"
        />
        <TextInput
          placeholder="Add location"
          placeholderTextColor="#969696"
          // style={styles.input}
          onChangeText={text => setLocation(text)}
          defaultValue={location}
          onFocus={handleFocus2}
          onBlur={handleBlur2}
          style={{
            borderBottomColor: isFocused2 ? '#00BFFF' : '#6E6E6E',
            borderBottomWidth: 1,
            bottom: 20,
            //   left: 20,
            //   fontSize: 22,
            color: 'gray',
            //   borderBottomWidth: 2,
            //   borderColor: '#808080',
            width: 270,
            right: 50,
            left: 1,
            //   marginTop: 50,
            //   marginBottom: 30,
          }}
        />
      </View>
      {locationMsg && (
        <Text style={{color: 'red', textAlign: 'center'}}>
          {'Location is required'}
        </Text>
      )}
      <ActivityIndicator color={colors.blue} size={40} animating={activate} />

      <View style={styles.container2}>
        <AppointmentDetails
          onPress={() => setCalendarModal(true)}
          name="calendar-text"
        />
        <TextInput
          placeholder="Add Notes"
          placeholderTextColor="#969696"
          onChangeText={text => setNotes(text)}
          defaultValue={notes}
          onFocus={handleFocus3}
          onBlur={handleBlur3}
          style={{
            borderBottomColor: isFocused3 ? '#00BFFF' : '#6E6E6E',
            borderBottomWidth: 1,
            bottom: 20,
            width: 270,
            right: 50,
            left: 1,
            color: 'gray',
          }}
        />
      </View>
      {notesMsg && (
        <Text style={{color: 'red', textAlign: 'center'}}>
          {'Notes is required'}
        </Text>
      )}

      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          setColor(colors.blue);
          console.log(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <View style={styles.container2}>
        <AppointmentDetails
          onPress={() => setOpen(true)}
          name="clock"
          title="Select Date"
        />
      </View>
      {dateMsg && (
        <Text style={{color: 'red', textAlign: 'center'}}>
          {'Date is required field'}
        </Text>
      )}
      <Text style={{color: color, marginLeft: 80}}>{String(date)}</Text>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 40,
          }}>
          <View style={{alignItems: 'center'}}>
            <TouchableHighlight
              underlayColor="#A9E2F3"
              style={styles.btn2}
              onPress={goToAppointmentDetails}>
              <MaterialCommunityIcons
                name="eye"
                size={20}
                color={colors.white}
              />
            </TouchableHighlight>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableHighlight
              underlayColor="#A9E2F3"
              style={styles.btn1}
              onPress={() => handleUpdate()}>
              <MaterialCommunityIcons
                name="check-bold"
                size={20}
                color={colors.white}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container2: {
    marginLeft: 15,
    marginTop: 40,
    flexDirection: 'row',
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    margin: 40,
  },
  btn1: {
    backgroundColor: '#00BFFF',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    shadowOpacity: 5.9,
    elevation: 10,
    shadowRadius: 3,
    left: 20,
  },
  btn2: {
    backgroundColor: '#00BFFF',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    shadowOpacity: 5.9,
    elevation: 10,
    shadowRadius: 3,
    right: 20,
  },
});
