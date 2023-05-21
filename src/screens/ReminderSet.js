// import React, {useState} from 'react';
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   Text,
//   SafeAreaView,
//   TouchableNativeFeedback,
//   Button,
//   TouchableOpacity,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import MaterialCommunityIcons from 'react-native-vector-icons/Feather';
// import Feather from 'react-native-vector-icons/Feather';
// import ReactCheckBox from '../components/ReactCheckBox.js';
// import DatePicker from 'react-native-date-picker';
// import AppTextInput from '../components/AppTextInput.js';
// import TimePicker from '../components/TimePicker.js';
// import {TouchableHighlight} from 'react-native-gesture-handler';

// function ReminderSet(props, {navigation}) {
//   const [name, setName] = useState('');
//   const [note, setNote] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [saveData, setSaveData] = useState('');
//   const [date, setDate] = useState(new Date());
//   const [open, setOpen] = useState(false);

//   const handleMedication = () => {
//     navigation.navigate;
//     // event.preventDefault();
//     // console.log('old value: ', saveData);
//     // setSaveData();
//     // console.log(name);
//     // console.log(note);
//     // console.log(date);
//   };
//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         underlineColorAndroid="transparent"
//         placeholder="Medicine Name"
//         placeholderTextColor="grey"
//         autoCapitalize="none"
//         onChangeText={value => setName(value)}
//         // onChangeText={handleChange}
//       />

//       <TextInput
//         style={styles.input}
//         underlineColorAndroid="transparent"
//         placeholder="Notes"
//         placeholderTextColor="grey"
//         autoCapitalize="none"
//         onChangeText={value => setNote(value)}
//       />
//       <View
//         style={{
//           height: 10,
//           width: '100%',
//           backgroundColor: '#CFD8DC',
//           marginTop: 15,
//         }}></View>

//       <TouchableOpacity onPress={() => setOpen(true)}>
//         <SafeAreaView style={styles.container}>
//           <View style={styles.btnContainer}>
//             <Text style={styles.button}>Select Time</Text>
//             <Icon
//               name="chevron-right"
//               size={20}
//               style={{marginRight: 20}}
//               onPress={() => setOpen(true)}
//               color="black"
//             />
//           </View>
//         </SafeAreaView>
//       </TouchableOpacity>
//       <DatePicker
//         modal
//         open={open}
//         date={date}
//         onConfirm={date => {
//           setOpen(false);
//           setDate(date);
//         }}
//         onCancel={() => {
//           setOpen(false);
//         }}
//       />

//       <View
//         style={{
//           height: 10,
//           width: '100%',
//           backgroundColor: '#CFD8DC',
//           marginTop: 18,
//         }}></View>

//       <SafeAreaView style={styles.container}>
//         <TouchableOpacity
//           title={'Show Component'}
//           onPress={() => {
//             setModalVisible(true);
//           }}>
//           <View style={styles.btnContainer}>
//             <Text style={styles.button}>Select Days</Text>

//             <Icon
//               name="chevron-right"
//               size={20}
//               style={{marginRight: 20, marginLeft: 230}}
//               onPress={() => setModalVisible(true)}
//               color="black"
//             />
//             {<ReactCheckBox show={modalVisible} setShow={setModalVisible} />}
//           </View>
//         </TouchableOpacity>
//       </SafeAreaView>

//       <View
//         style={{
//           height: 10,
//           width: '100%',
//           backgroundColor: '#CFD8DC',
//           marginTop: 18,
//         }}></View>
//       <View style={{marginTop: 180, width: '80%', marginLeft: '10%'}}>
//         <TouchableHighlight onPress={() => console.log('Hello')}>
//           <View style={styles.btn}>
//             <Text style={{color: 'white'}}>ADD MEDICATION</Text>
//           </View>
//         </TouchableHighlight>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 20,
//   },
//   input: {
//     margin: 15,
//     height: 40,
//     borderColor: '00BFFF',
//     borderBottomWidth: 1,
//     color: '#585858',
//   },
//   button: {
//     color: '#2E2E2E',
//   },
//   btnContainer: {
//     marginLeft: 17,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   btn: {
//     backgroundColor: '#00BFFF',
//     height: 50,
//     width: '80%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: '10%',
//     // right: 10,
//     borderRadius: 40,
//     // left: '33%'
//   },
// });

// export default ReminderSet;
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TimePickerAndroid,
  Button,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ListAlarms from '../components/alarm/ListAlarms';
import TimePicker from '../components/alarm/TimePicker';

export default function ReminderSet() {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>ALARM REMINDER</Text>
      <SafeAreaView style={styles.listAlarms}>
        <View style={{flexDirection: 'row'}}>
          <ListAlarms />
        </View>
      </SafeAreaView>
      <View style={styles.timePicker}>
        <TimePicker />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  heading: {
    // fontWeight: "bold",
    fontSize: 25,
    padding: 20,
    fontWeight: 'bold',
    color: '#00BFFF',
  },
  timePicker: {
    bottom: 140,
    alignItems: 'center',
    color: 'grey',
  },
  listAlarms: {
    flex: 1,
    width: '100%',
    left: 20,
  },
});
