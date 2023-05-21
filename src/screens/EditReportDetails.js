import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../config/color';
import DatePicker from 'react-native-date-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import notifee, {TriggerType} from '@notifee/react-native';
import {link} from '../../serve';

export default function EditReportDetails({route}) {
  // const route = useRoute();

  const {updateId} = route.params;

  const [medName, setMedName] = useState('');
  const [medForm, setMedForm] = useState('');
  const [date, setDate] = useState(new Date());
  const [indication, setIndication] = useState(false);
  const handleUpdate = async id => {
    console.log(`URl            ${link}update-report/${updateId}`);

    console.log({
      medName: 'medName',
      medForm: 'medForm',
      date: date,
    });

    try {
      const res = await axios.put(
        `${link}update-report/${updateId}`,
        {
          medName: medName,
          medForm: medForm,
          date: date,
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
    let cDay = date.getDate();
    let cMonth = date.getMonth() + 1;
    let cYear = date.getFullYear();
    let cHours = date.getHours();
    const formattedHours = (cHours % 12).toString().padStart(2, '0');
    let cMinutes = date.getMinutes();
    const text = `${
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
        title: 'Take your medicine',
        body: text,
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
          sound: 'doorbell',
        },
      },
      {type: TriggerType.TIMESTAMP, timestamp: date.getTime()},
    );
  };

  const timer = () => {
    setTimeout(() => {
      setIndication(false);
    }, 3000);
  };

  const handleBtn = () => {
    setIndication(true);
    onReminder();
    handleUpdate();
    timer();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputCon}>
        <TextInput
          placeholder="Medicine Name"
          style={styles.input}
          onChangeText={text => setMedName(text)}
          defaultValue={medName}
        />
        <TextInput
          placeholder="Medicine Form"
          style={styles.input}
          onChangeText={text => setMedForm(text)}
          defaultValue={medForm}
        />
        <Text style={{color: 'red'}}>{updateId}</Text>
        {/* <TouchableHighlight style={styles.btn}>
          <Text style={{color: 'white', textAlign: 'center'}}>Date</Text>
        </TouchableHighlight> */}
        <DatePicker
          date={date}
          onDateChange={setDate}
          style={styles.datePicker}
        />
        <View style={styles.textCon}>
          <Text style={styles.text}>{String(date)}</Text>
        </View>
        <View>
          <ActivityIndicator
            size={50}
            color={colors.blue}
            animating={indication}
          />
        </View>
      </View>
      <TouchableHighlight
        underlayColor="#81DAF5"
        style={styles.editBtn}
        onPress={handleBtn}>
        <MaterialCommunityIcons name="check" size={20} color={colors.white} />
      </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  inputCon: {
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    margin: 10,
  },
  datePicker: {
    marginTop: 50,
  },
  textCon: {
    borderWidth: 1,
    borderColor: colors.gray,
    marginTop: 30,
  },
  text: {
    color: colors.blue,
    textAlign: 'center',
  },
  editBtn: {
    marginTop: 80,
    backgroundColor: colors.blue,
    padding: 20,
    borderRadius: 40,
  },
});
