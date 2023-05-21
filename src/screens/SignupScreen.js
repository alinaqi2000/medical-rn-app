import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import notifee from '@notifee/react-native';
import {link} from '../../serve';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

export default function SignupScreen({navigation}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
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
  const handleFocus2 = () => {
    setIsFocused2(true);
  };
  const handleBlur2 = () => {
    setIsFocused2(false);
  };

  const handleSubmit = ({name, email, password}) => {
    fetch(link + 'signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        passwordHash: password,
      }),
    });
  };
  //Display push notifications
  // const onDisplayNotification = async () => {
  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission();

  //   // Create a channel (required for Android)
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //   });

  //   // Display a notification
  //   await notifee.displayNotification({
  //     title: 'Medical Assistant',
  //     body: 'You have successfully registered!',
  //     android: {
  //       channelId,
  //       // pressAction is needed if you want the notification to open the app when pressed
  //       pressAction: {
  //         id: 'default',
  //       },
  //     },
  //   });
  // };
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.imgCon}>
          <View style={{top: 40}}>
            <Image
              source={require('../assets/logoo.png')}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            {({handleChange, handleSubmit, errors, resetForm}) => (
              <>
                <TextInput
                  // style={styles.input}
                  placeholder="Name"
                  onChangeText={handleChange('name')}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    borderBottomColor: isFocused ? '#00BFFF' : '#6E6E6E',
                    borderBottomWidth: 1,
                    fontSize: 15,
                    color: 'black',
                    borderBottomWidth: 2,
                    borderColor: '#808080',
                    width: 280,
                    marginBottom: 10,
                  }}
                />
                <TextInput
                  // style={styles.input}
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onFocus={handleFocus1}
                  onBlur={handleBlur1}
                  style={{
                    borderBottomColor: isFocused1 ? '#00BFFF' : '#6E6E6E',
                    borderBottomWidth: 1,
                    fontSize: 15,
                    color: 'black',
                    borderBottomWidth: 2,
                    borderColor: '#808080',
                    width: 280,
                  }}
                />
                <Text style={{color: 'red'}}>{errors.email}</Text>
                <TextInput
                  // style={styles.input}
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onFocus={handleFocus2}
                  onBlur={handleBlur2}
                  style={{
                    borderBottomColor: isFocused2 ? '#00BFFF' : '#6E6E6E',
                    borderBottomWidth: 1,
                    fontSize: 15,
                    color: 'black',
                    borderBottomWidth: 2,
                    borderColor: '#808080',
                    width: 280,
                    marginBottom: 10,
                  }}
                />
                <Text style={{color: 'red'}}>{errors.password}</Text>
                <TouchableOpacity onPress={handleSubmit}>
                  <View
                    style={{
                      backgroundColor: '#00BFFF',
                      top: 40,
                      paddingHorizontal: 115,
                      paddingVertical: 12,
                    }}>
                    <Text style={{color: 'white'}}>Register</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
        <TouchableOpacity
          style={{marginTop: 90, alignItems: 'center'}}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={{color: '#00BFFF'}}>You have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
  imgCon: {
    alignItems: 'center',
  },
});
