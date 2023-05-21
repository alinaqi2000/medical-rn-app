import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {colors} from '../../config/color';
import { link } from '../../serve';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  speciality: Yup.string().required().label('Speciality'),
  phone: Yup.string().required().label('Phone'),
  email: Yup.string().required().email().label('Email'),
  address: Yup.string().required().label('Address'),
});

export default function EditDoctorsDetails({navigation, route}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);
  const [isFocused5, setIsFocused5] = useState(false);
  const [animating, setAnimating] = useState(false);
  const {updateId} = route.params;

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
  const handleSubmit = async ({name, speciality, phone, email, address}) => {
    console.log(`URl            ${link}update-doctor/${updateId}`);

    console.log({
      name: name,
      speciality: speciality,
      phone: phone,
      email: email,
      address: address,
    });

    try {
      const res = await axios.put(
        `${link}update-doctor/${updateId}`,
        {
          name: name,
          speciality: speciality,
          phone: phone,
          email: email,
          address: address,
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
    setAnimating(true);
    setTimeout(() => {
      Alert.alert(`Doctor is updated successfully`);
    }, 3000);
    setTimeout(() => {
      setAnimating(false);
    }, 3000);
  };
  console.log(updateId);

  return (
    <View>
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
          <>
            <View style={styles.inputCon}>
              <TextInput
                placeholder="Name.."
                style={{
                  borderWidth: 1,
                  margin: 10,
                  color: 'gray',
                  borderRadius: 20,
                  borderColor: isFocused ? '#00BFFF' : '#6E6E6E',
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={handleChange('name')}
              />
              <Text style={{color: 'red', textAlign: 'center'}}>
                {errors.name}
              </Text>
              <TextInput
                placeholder="Speciality"
                style={{
                  borderWidth: 1,
                  margin: 10,
                  color: 'gray',
                  borderRadius: 20,
                  borderColor: isFocused2 ? '#00BFFF' : '#6E6E6E',
                }}
                onFocus={handleFocus2}
                onBlur={handleBlur2}
                onChangeText={handleChange('speciality')}
              />
              <Text style={{color: 'red', textAlign: 'center'}}>
                {errors.speciality}
              </Text>
              <TextInput
                placeholder="Phone"
                style={{
                  borderWidth: 1,
                  margin: 10,
                  color: 'gray',
                  borderRadius: 20,
                  borderColor: isFocused3 ? '#00BFFF' : '#6E6E6E',
                }}
                onFocus={handleFocus3}
                onBlur={handleBlur3}
                onChangeText={handleChange('phone')}
                keyboardType="numeric"
              />
              <Text style={{color: 'red', textAlign: 'center'}}>
                {errors.phone}
              </Text>
              <TextInput
                placeholder="Email"
                style={{
                  borderWidth: 1,
                  margin: 10,
                  color: 'gray',
                  borderRadius: 20,
                  borderColor: isFocused4 ? '#00BFFF' : '#6E6E6E',
                }}
                onFocus={handleFocus4}
                onBlur={handleBlur4}
                onChangeText={handleChange('email')}
              />
              <Text style={{color: 'red', textAlign: 'center'}}>
                {errors.email}
              </Text>
              <TextInput
                placeholder="Address"
                style={{
                  borderWidth: 1,
                  margin: 10,
                  color: 'gray',
                  borderRadius: 20,
                  borderColor: isFocused5 ? '#00BFFF' : '#6E6E6E',
                }}
                onFocus={handleFocus5}
                onBlur={handleBlur5}
                onChangeText={handleChange('address')}
              />
              <Text style={{color: 'red', textAlign: 'center'}}>
                {errors.address}
              </Text>
              <ActivityIndicator
                color={colors.blue}
                size={30}
                animating={animating}
              />
            </View>
            <Text style={{color: 'red'}}>{updateId}</Text>

            <View style={{bottom: 20}}>
              <Button
                title="Update"
                onPress={handleSubmit}
                color={colors.blue}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  inputCon: {
    margin: 20,
  },
  input: {
    borderWidth: 1,
    margin: 10,
    color: 'gray',
    borderRadius: 20,
  },
});
