import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../config/color';
import {link} from '../../serve';

export default function PrescriptionEdit({route}) {
  const {updateId} = route.params;
  const [medName, setMedName] = useState('');
  const [prescription, setprescription] = useState('');

  const handleUpdate = async id => {
    console.log(`URl            ${link}update-prescription/${updateId}`);

    console.log({
      medName: 'medName',
      prescriptionDetails: 'prescription',
    });

    console.log(updateId);

    try {
      const res = await axios.put(
        `${link + updateId}`,
        {
          medName: medName,
          prescriptionDetails: prescription,
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

  return (
    <View style={styles.container}>
      <View style={styles.inputCon}>
        <TextInput
          placeholder="Medicine Name"
          style={styles.input}
          onChangeText={text => setMedName(text)}
          defaultValue={medName}
        />
        <Text style={{color: 'red'}}>{updateId}</Text>
        <TextInput
          placeholder="Medicine Form"
          style={styles.input}
          onChangeText={text => setprescription(text)}
          defaultValue={prescription}
        />
        {/* <TouchableHighlight style={styles.btn}>
        <Text style={{color: 'white', textAlign: 'center'}}>Date</Text>
      </TouchableHighlight> */}
      </View>
      <TouchableHighlight
        underlayColor="#81DAF5"
        style={styles.editBtn}
        onPress={handleUpdate}>
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
