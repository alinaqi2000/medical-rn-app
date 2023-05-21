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
import {link} from '../../serve';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const LoginScreen = ({navigation}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
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

  const handleSubmit = ({email, password}) => {
    fetch(link + 'Login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')}>
          <Text style={{left: 330, top: 10, color: '#00BFFF'}}>Skip</Text>
        </TouchableOpacity>
        <View style={styles.imgCon}>
          <View style={{top: 40}}>
            <Image
              source={require('../assets/logoo.png')}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            {({handleChange, handleSubmit, errors}) => (
              <>
                <TextInput
                  // style={styles.input}
                  placeholder="Email"
                  onChangeText={handleChange('email')}
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
                <Text style={{color: 'red'}}>{errors.email}</Text>
                <TextInput
                  // style={styles.input}
                  placeholder="Password"
                  onChangeText={handleChange('password')}
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
                    marginBottom: 10,
                  }}
                />
                <Text style={{color: 'red'}}>{errors.password}</Text>
                <TouchableOpacity onPress={handleSubmit}>
                  <View
                    style={{
                      backgroundColor: '#00BFFF',
                      top: 40,
                      paddingHorizontal: 120,
                      paddingVertical: 12,
                    }}>
                    <Text style={{color: 'white'}}>Login</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
        <TouchableOpacity
          style={{marginTop: 90, alignItems: 'center'}}
          onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={{color: '#00BFFF'}}>Don't have an account? Signup</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
  imgCon: {
    alignItems: 'center',
  },
});
export default LoginScreen;
