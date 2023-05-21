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
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import notifee, {TriggerType} from '@notifee/react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppointmentDetails from '../components/more/AppointmentDetails';
import {colors} from '../../config/color';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { link } from '../../serve';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label('Appointment Title'),
  location: Yup.string().required().min(4).label('Location'),
  notes: Yup.string().required().min(4).label('Notes'),
});

export default function AddAppointment({navigation, route}) {
  const getDetails = type => {
    if (route.params) {
      switch (type) {
        case 'title':
          return route.params.title;
        case 'date':
          return route.params.date;
        case 'location':
          return route.params.location;
        case 'notes':
          return route.params.notes;
      }
    }
    return '';
  };

  // const [title, setTitle] = useState(getDetails('title'));
  // const [titleMsg, setTitleMsg] = useState(false);
  // const [location, setLocation] = useState(getDetails('location'));
  // const [locationMsg, setlocationMsg] = useState(false);
  // const [notes, setNotes] = useState(getDetails('notes'));
  // const [notesMsg, setnotesMsg] = useState(false);
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
  const [activity, setActivity] = useState(false);

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

  const handleSubmit = ({title, location, notes}) => {
    var errorFlag = false;
    // if (title) {
    //   errorFlag = true;
    //   setTitleMsg(false);
    // } else {
    //   errorFlag = false;
    //   setTitleMsg(true);
    // }

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

    // if (location) {
    //   errorFlag = true;
    //   setlocationMsg(false);
    // } else {
    //   errorFlag = false;
    //   setTitleMsg(true);
    // }

    // if (notes) {
    //   errorFlag = true;
    //   setnotesMsg(false);
    // } else {
    //   errorFlag = false;
    //   setnotesMsg(false);
    // }
    // setTitle('');
    // setLocation();
    // setNotes();
    fetch(link + 'send-appoin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        date: date,
        location: location,
        notes: notes,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        Alert.alert(`${data.title} is saved successfully`);
      });
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

  const goToAppointmentDetails = ({title, date, location, notes}) => {
    navigation.navigate('Appointment Details', {
      title,
      date,
      location,
      notes,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Formik
        initialValues={{title: '', location: '', notes: ''}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({handleChange, handleSubmit, errors}) => (
          <>
            <TextInput
              placeholder="Appointment Title"
              placeholderTextColor="#969696"
              // style={styles.input}
              onChangeText={handleChange('title')}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{
                borderBottomColor: isFocused ? '#00BFFF' : '#6E6E6E',
                borderBottomWidth: 1,
                left: 20,
                fontSize: 22,
                color: 'black',
                borderBottomWidth: 2,
                borderColor: '#808080',
                width: 325,
                marginTop: 50,
                marginBottom: 30,
              }}
            />
            <Text style={{color: 'red', textAlign: 'center'}}>
              {errors.title}
            </Text>
            {/* {titleMsg && (
        <Text style={{color: 'red', textAlign: 'center'}}>
          {'Appointment title is required'}
        </Text>
      )} */}

            <Modal
              visible={doctorModal}
              animationType="fade"
              transparent={true}>
              <View
                style={{
                  marginTop: 200,
                  backgroundColor: 'white',
                  padding: 20,
                  width: 200,
                  marginLeft: 100,
                  opacity: 4,
                }}>
                <View style={{flexDirection: 'row', marginBottom: 30}}>
                  <View
                    style={{
                      backgroundColor: 'grey',
                      borderRadius: 20,
                      padding: 5,
                    }}>
                    <MaterialCommunityIcons
                      name="minus-circle-outline"
                      color="white"
                      size={25}
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => setDoctorModal(!doctorModal)}>
                    <Text
                      style={{
                        color: 'grey',
                        marginLeft: 20,
                        fontSize: 18,
                        top: 4,
                      }}>
                      None
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      backgroundColor: 'grey',
                      borderRadius: 20,
                      padding: 5,
                    }}>
                    <MaterialCommunityIcons
                      name="plus-circle"
                      color="white"
                      size={25}
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('Add Doctor')}>
                    <Text
                      style={{
                        color: 'grey',
                        marginLeft: 20,
                        fontSize: 18,
                        top: 4,
                      }}>
                      Add Doctor
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setDoctorModal(!doctorModal);
                  }}
                  style={{flexDirection: 'row-reverse', marginTop: 5, top: 10}}>
                  <Text style={{color: '#00BFFF'}}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <View style={styles.container2}>
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
            </View>

            <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={date => {
                const currentTime = Date.now();
                if (date.getTime() < currentTime) {
                  Alert.alert('Please choose future Date');
                  return;
                }
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
            <Text style={{color: color, marginLeft: 80}}>{String(date)}</Text>
            {dateMsg && (
              <Text style={{color: 'red', textAlign: 'center'}}>
                {'Date is required field'}
              </Text>
            )}
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 15,
                marginTop: 20,
                marginBottom: 10,
              }}>
              <AppointmentDetails name="bell" />
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Text style={{color: 'grey'}}>Reminder Before Appointment</Text>
                {/* {dates ? <Text>{String(dates)}</Text> : <Text>Select your date</Text>} */}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'grey',
                  borderRadius: 5,
                  justifyContent: 'center',
                  left: 10,
                  bottom: 3,
                }}
                onPress={onReminder}>
                <MaterialCommunityIcons name="plus" size={20} color="white" />
              </TouchableOpacity>
              <DatePicker
                modal
                open={open}
                date={dates}
                onConfirm={dates => {
                  setOpen(false);
                  setDates(dates);
                  console.log(dates);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>

            <ActivityIndicator
              size={50}
              color={colors.blue}
              animating={activity}
            />

            <View style={styles.container2}>
              <AppointmentDetails
                onPress={() => setCalendarModal(true)}
                name="map-marker"
              />

              <TextInput
                placeholder="Add location"
                placeholderTextColor="#969696"
                // style={styles.input}
                onChangeText={handleChange('location')}
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
            <Text style={{color: 'red', textAlign: 'center'}}>
              {errors.location}
            </Text>
            {/* {locationMsg && (
        <Text style={{color: 'red', textAlign: 'center'}}>
          {'Location is required'}
        </Text>
      )} */}

            <View style={styles.container2}>
              <AppointmentDetails
                onPress={() => setCalendarModal(true)}
                name="calendar-text"
              />
              <TextInput
                placeholder="Add Notes"
                placeholderTextColor="#969696"
                onChangeText={handleChange('notes')}
                onFocus={handleFocus3}
                onBlur={handleBlur3}
                style={{
                  borderBottomColor: isFocused3 ? '#00BFFF' : '#6E6E6E',
                  borderBottomWidth: 1,
                  bottom: 20,
                  width: 270,
                  right: 50,
                  color: 'gray',
                  left: 1,
                }}
              />
            </View>
            <Text style={{color: 'red', textAlign: 'center'}}>
              {errors.notes}
            </Text>
            {/* {notesMsg && (
        <Text style={{color: 'red', textAlign: 'center'}}>
          {'Notes is required'}
        </Text>
      )} */}
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
                    onPress={handleSubmit}>
                    <MaterialCommunityIcons
                      name="plus"
                      size={20}
                      color={colors.white}
                    />
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  container2: {
    marginLeft: 15,
    marginTop: 20,
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
