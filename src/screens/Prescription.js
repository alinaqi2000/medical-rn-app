import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {colors} from '../../config/color';
import {launchImageLibrary} from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {link} from '../../serve';

const validationSchema = Yup.object().shape({
  medName: Yup.string().required().label('Medicine Name'),
  prescription: Yup.string().required().min(4).label('Prescription'),
});

export default function Prescription({navigation, route}) {
  const getDetails = type => {
    if (route.params) {
      switch (type) {
        case 'medName':
          return route.params.medName;
        case 'prescription':
          return route.params.prescription;
        case 'text':
          return route.params.text;
      }
    }
    return '';
  };
  // const [medName, setMedName] = useState(getDetails('medName'));
  // const [prescription, setPrescription] = useState(getDetails('prescription'));
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState([getDetails('text')]);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleFocus1 = () => {
    setIsFocused1(true);
  };
  const handleBlur1 = () => {
    setIsFocused1(false);
  };

  // const SaveBtn = () => {
  //   handleSubmit();
  //   console.log(text);
  //   // navigation.navigate('Prescription Details');
  // };

  const goToMessageScreen = () => {
    navigation.navigate('Prescription Details');
  };

  const handleSubmit = ({medName, prescription}) => {
    // setMedName('');
    // setPrescription();
    setText();

    fetch(link + 'send-pres', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        medName: medName,
        prescriptionDetails: prescription,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        Alert.alert(`${data.name} is saved successfully`);
      });
  };

  useEffect(() => {
    (async () => {
      if (image) {
        const result = await TextRecognition.recognize(image.assets[0].uri);
        console.log(result);
        setText(result);
      }
    })();
  }, [image]);

  const handleImage = () => {
    launchImageLibrary({}, setImage);
  };
  return (
    <View>
      <Formik
        initialValues={{medName: '', prescription: ''}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({handleChange, handleSubmit, errors}) => (
          <>
            <TextInput
              cursorColor={colors.gray}
              placeholder="Med name"
              placeholderTextColor="#969696"
              // style={styles.input}
              onChangeText={handleChange('medName')}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{
                borderBottomColor: isFocused ? '#00BFFF' : '#6E6E6E',
                marginLeft: 10,
                marginRight: 10,
                fontSize: 15,
                color: 'black',
                borderBottomWidth: 1,
                marginTop: 50,
                marginBottom: 30,
                height: 50,
              }}
            />
            <Text style={{color: 'red', textAlign: 'center'}}>
              {errors.medName}
            </Text>
            <View style={styles.inputCon}>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 17,
                  fontWeight: '600',
                  color: 'gray',
                }}>
                Prescription
              </Text>
              <TextInput
                cursorColor={colors.gray}
                onChangeText={handleChange('prescription')}
                onFocus={handleFocus1}
                onBlur={handleBlur1}
                multiline
                numberOfLines={12}
                style={{
                  borderWidth: 1,
                  borderColor: isFocused1 ? '#00BFFF' : '#6E6E6E',
                  color: 'gray',
                }}
              />
              <Text style={{color: 'red', textAlign: 'center'}}>
                {errors.prescription}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableHighlight
                  style={styles.btn}
                  onPress={handleImage}
                  underlayColor={colors.blue}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    Upload
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.btn1}
                  onPress={handleSubmit}
                  underlayColor={colors.blue}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    Save
                  </Text>
                </TouchableHighlight>
              </View>
              {/* 
              <View>
                {text ? <Text style={{color: 'white'}}>{text}</Text> : null}
              </View> */}
            </View>
            <TouchableHighlight
              underlayColor="#81DAF5"
              style={styles.saveBtn}
              onPress={goToMessageScreen}>
              <Text style={{color: 'white', textAlign: 'center'}}>View</Text>
            </TouchableHighlight>
          </>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  inputCon: {
    margin: 10,
  },
  btn: {
    backgroundColor: colors.gray,
    width: 55,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  btn1: {
    backgroundColor: colors.gray,
    width: 55,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 20,
    left: 5,
  },
  textCon: {
    backgroundColor: colors.blue,
  },
  saveBtn: {
    top: '10%',
    backgroundColor: colors.blue,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    left: '20%',
    padding: 20,
    borderRadius: 200,
  },
});
