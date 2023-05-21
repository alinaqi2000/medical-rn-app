import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../config/color';
import {useNavigation} from '@react-navigation/native';

export default function AddReportMed({navigation}) {
  const [isFocused, setIsFocused] = useState(false);
  const [medName, setMedName] = useState('');
  const [medMsg, setMedMsg] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [color, setColor] = useState(colors.gray);

  const changeText = () => {
    // text => setMedName(text);
    setIsDisabled(false);
    setColor(colors.blue);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const showIndicator = () => {
    setVisible(true);
  };

  const hideIndicator = () => {
    setVisible(false);
  };

  setTimeout(hideIndicator, 3000);

  const handleSubmit = () => {
    var errorFlag = false;
    if (medName) {
      errorFlag = true;
      setMedMsg(false);
      setMedName('');
      showIndicator();
      navigation.navigate('Med Form', {
        medName,
      });
    } else {
      errorFlag = false;
      setMedMsg(true);
    }
  };

  return (
    <View>
      <View style={{backgroundColor: '#00BFFF', height: 140}}>
        <MaterialCommunityIcons
          name="pill"
          color="white"
          size={30}
          style={{left: 20}}
        />
        <View style={styles.container2}>
          <Text style={styles.text}>What medicine would you like to add?</Text>
        </View>
        <View style={styles.inputCon}>
          <TextInput
            cursorColor={colors.gray}
            onChangeText={text => setMedName(text)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              borderBottomWidth: 2,
              marginTop: 10,
              width: '90%',
              borderBottomColor: isFocused ? '#00BFFF' : '#6E6E6E',
              color: 'gray',
            }}
          />
          {medMsg && (
            <Text style={{color: 'red', textAlign: 'center'}}>
              {'Medicine Name is required'}
            </Text>
          )}
          <View style={{alignItems: 'center'}}>
            <TouchableHighlight
              style={{
                backgroundColor: color,
                paddingHorizontal: 100,
                marginTop: '20%',
                paddingVertical: 15,
                borderRadius: 40,
              }}
              underlayColor="#81DAF5"
              onPress={handleSubmit}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'white', fontSize: 17, fontWeight: '600'}}>
                  Next
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  style={{
                    color: 'white',
                    fontSize: 17,
                    left: '400%',
                    top: 4,
                    fontWeight: 'bold',
                  }}
                />
              </View>
            </TouchableHighlight>
          </View>
          <View style={{marginTop: 80}}>
            <ActivityIndicator color="#00BFFF" size={40} animating={visible} />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container2: {
    marginTop: 30,
    marginLeft: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: '600',
    color: 'white',
    marginLeft: 10,
  },
  inputCon: {
    borderRadius: 20,
    backgroundColor: 'white',
    marginTop: 30,
    height: 600,
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginTop: 10,
    width: '90%',
  },
  btn: {
    backgroundColor: 'red',
    paddingHorizontal: 100,
    marginTop: '20%',
    paddingVertical: 15,
    borderRadius: 40,
  },
});
