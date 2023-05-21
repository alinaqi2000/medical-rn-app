import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../config/color';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { link } from '../../serve';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  speciality: Yup.string().required().label('Speciality'),
  phone: Yup.string().required().label('Phone'),
  email: Yup.string().required().email().label('Email'),
  address: Yup.string().required().label('Address'),
});

export default function AddDoctor({navigation, route}) {
  const getDetails = type => {
    if (route.params) {
      switch (type) {
        case 'name':
          return route.params.name;
        case 'phone':
          return route.params.speciality;
        case 'email':
          return route.params.phone;
        case 'salary':
          return route.params.email;
        case 'picture':
          return route.params.address;
      }
    }
    return '';
  };

  // const [name, setName] = useState(getDetails('name'));
  // const [speciality, setSpeciality] = useState(getDetails('speciality'));
  // const [phone, setPhone] = useState(getDetails(phone));
  // const [email, setEmail] = useState(getDetails(email));
  // const [address, setAddress] = useState(getDetails(address));

  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);
  const [isFocused5, setIsFocused5] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleSubmit = ({
    name,
    speciality,
    phone,
    email,
    address,
    resetForm,
  }) => {
    fetch(link + 'send-data', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        speciality: speciality,
        phone: phone,
        email: email,
        address: address,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        resetForm({});
      });
    setAnimating(true);
    setTimeout(() => {
      Alert.alert(`Doctor is saved successfully`);
    }, 3000);
    setTimeout(() => {
      setAnimating(false);
    }, 3000);
  };

  const goToMessageScreen = () => {
    navigation.navigate('Doctors Detail');
  };
  // const handleClick = () => {
  //   handleNavigation();
  //   doctorInfo();
  // };

  // function doctorInfo() {
  //   console.log('Doctor name:', doctorName);
  //   console.log('Speciality:', speciality);
  //   console.log('Phone number:', phone);
  //   console.log('Email:', email);
  //   console.log('Address:', address);
  // }

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
  const handleFocus4 = () => {
    setIsFocused4(true);
  };
  const handleBlur4 = () => {
    setIsFocused4(false);
  };
  const handleFocus5 = () => {
    setIsFocused5(true);
  };
  const handleBlur5 = () => {
    setIsFocused5(false);
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: colors.blue}}>
        <Formik
          initialValues={{
            name: '',
            speciality: '',
            phone: '',
            email: '',
            address: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({handleChange, handleSubmit, errors}) => (
            <View style={styles.container}>
              <KeyboardAvoidingView>
                <View style={styles.container2}>
                  <MaterialCommunityIcons
                    name="account-tie"
                    color="#808080"
                    size={30}
                    style={{left: 10, marginTop: 15, marginRight: 20}}
                  />
                  <TextInput
                    placeholder="Doctor's Name"
                    placeholderTextColor="#969696"
                    // style={styles.input}
                    onChangeText={handleChange('name')}
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
                      width: 200,
                    }}
                  />
                </View>
                <Text style={{color: 'red', textAlign: 'center'}}>
                  {errors.name}
                </Text>
                <View style={styles.container4}>
                  <MaterialCommunityIcons
                    name="briefcase-check"
                    color="#808080"
                    size={30}
                    style={{left: 10, marginTop: 15, marginRight: 20, top: 40}}
                  />
                  <TextInput
                    placeholder="Speciality"
                    placeholderTextColor="#969696"
                    onChangeText={handleChange('speciality')}
                    onFocus={handleFocus2}
                    onBlur={handleBlur2}
                    style={{
                      borderBottomColor: isFocused2 ? '#00BFFF' : '#6E6E6E',
                      borderBottomWidth: 2,
                      left: 20,
                      fontSize: 16,
                      color: 'black',
                      width: 280,
                      marginTop: 40,
                    }}
                  />
                </View>
                <Text style={{color: 'red', textAlign: 'center'}}>
                  {errors.speciality}
                </Text>
                <View style={styles.container3}>
                  <MaterialCommunityIcons
                    name="phone"
                    color="#808080"
                    size={30}
                    style={{left: 10, marginTop: 15}}
                  />
                  <TextInput
                    placeholder="Phone number"
                    placeholderTextColor="#969696"
                    keyboardType="numeric"
                    onChangeText={handleChange('phone')}
                    onFocus={handleFocus3}
                    onBlur={handleBlur3}
                    style={{
                      borderBottomColor: isFocused3 ? '#00BFFF' : '#6E6E6E',
                      borderBottomWidth: 1,
                      left: 40,
                      fontSize: 16,
                      color: 'black',
                      borderBottomWidth: 2,
                      borderColor: '#808080',
                      width: 140,
                    }}
                  />
                </View>
                <Text style={{color: 'red', textAlign: 'center'}}>
                  {errors.phone}
                </Text>
                <View style={styles.container3}>
                  <MaterialCommunityIcons
                    name="email"
                    color="#808080"
                    size={30}
                    style={{left: 10, marginTop: 15}}
                  />
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#969696"
                    onChangeText={handleChange('email')}
                    onFocus={handleFocus4}
                    onBlur={handleBlur4}
                    style={{
                      borderBottomColor: isFocused4 ? '#00BFFF' : '#6E6E6E',
                      borderBottomWidth: 1,
                      left: 40,
                      fontSize: 16,
                      color: 'black',
                      borderBottomWidth: 2,
                      borderColor: '#808080',
                      width: 280,
                    }}
                  />
                </View>
                <Text style={{color: 'red', textAlign: 'center'}}>
                  {errors.email}
                </Text>
                <View style={styles.container3}>
                  <Feather
                    name="map-pin"
                    color="#808080"
                    size={30}
                    style={{left: 10, marginTop: 15}}
                  />
                  <TextInput
                    placeholder="Address"
                    placeholderTextColor="#969696"
                    onChangeText={handleChange('address')}
                    onFocus={handleFocus5}
                    onBlur={handleBlur5}
                    style={{
                      borderBottomColor: isFocused5 ? '#00BFFF' : '#6E6E6E',
                      borderBottomWidth: 1,
                      left: 40,
                      fontSize: 16,
                      color: 'black',
                      borderBottomWidth: 2,
                      borderColor: '#808080',
                      width: 280,
                    }}
                  />
                </View>
                <Text style={{color: 'red', textAlign: 'center'}}>
                  {errors.address}
                </Text>
                <ActivityIndicator
                  color={colors.blue}
                  size={30}
                  animating={animating}
                />
                <View
                  style={{
                    marginTop: 25,
                    width: '80%',
                    marginLeft: '10%',
                  }}>
                  {/* <Button title="ADD DOCTOR" color="#00BFFF" onPress={submitData} />
            <Button title='View Doctor details' onPress={goToMessageScreen} /> */}
                  <View style={{alignItems: 'center'}}>
                    <TouchableHighlight
                      underlayColor="#A9E2F3"
                      style={styles.btn2}
                      onPress={handleSubmit}>
                      <MaterialCommunityIcons
                        name="plus"
                        size={20}
                        color={colors.white}
                      />
                    </TouchableHighlight>
                  </View>

                  <View style={{alignItems: 'center'}}>
                    <TouchableHighlight
                      underlayColor="#A9E2F3"
                      style={styles.btn1}
                      onPress={goToMessageScreen}>
                      <MaterialCommunityIcons
                        name="eye"
                        size={20}
                        color={colors.white}
                      />
                    </TouchableHighlight>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </View>
          )}
        </Formik>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container2: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  img: {
    width: 50,
    height: 50,
    top: 10,
    left: 10,
  },
  input: {
    left: 20,
    fontSize: 22,
    color: 'black',
    borderBottomWidth: 2,
    borderColor: '#808080',
    width: 200,
  },
  input2: {
    left: 20,
    fontSize: 16,
    color: 'black',
    width: 280,
    marginTop: 40,
  },
  input3: {
    left: 40,
    fontSize: 16,
    color: 'black',
    borderBottomWidth: 2,
    borderColor: '#808080',
    width: 140,
  },
  input4: {
    left: 40,
    fontSize: 16,
    color: 'black',
    borderBottomWidth: 2,
    borderColor: '#808080',
    width: 280,
  },
  container3: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
  },
  container4: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  btnStyle: {
    backgroundColor: '#00BFFF',
    marginLeft: 50,
    padding: 15,
    marginRight: 50,
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
