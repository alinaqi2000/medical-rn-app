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
  TouchableNativeFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../config/color';
import {useRoute} from '@react-navigation/native';

export default function AddMedForm({navigation}) {
  const [isFocused, setIsFocused] = useState(false);
  const [medForm, setMedForm] = useState('');
  const [medMsg, setMedMsg] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [color, setColor] = useState(colors.gray);
  const route = useRoute();

  const medName = route.params.medName;
  console.log(route.params.medName);

  const changeText = () => {
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
    if (medForm) {
      errorFlag = true;
      setMedMsg(false);
      setMedForm('');
      showIndicator();
      navigation.navigate('Med Time', {
        medForm,
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
        <View style={styles.container2}>
          <Text style={styles.text}>What strength is the med</Text>
        </View>
        <View style={styles.inputCon}>
          <TextInput
            onChangeText={text => setMedForm(text)}
            defaultValue={medForm}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              borderBottomWidth: 2,
              marginTop: 10,
              width: '30%',
              color: 'grey',
              borderBottomColor: isFocused ? '#00BFFF' : '#6E6E6E',
            }}
          />
          {medMsg && (
            <Text style={{color: 'red', textAlign: 'center'}}>
              {'Medicine Form is required'}
            </Text>
          )}
          <Text style={{color: colors.blue}}>{route.params.medName}</Text>
          <View style={{alignItems: 'center'}}>
            <TouchableHighlight
              underlayColor="#81DAF5"
              style={{
                backgroundColor: color,
                paddingHorizontal: 100,
                marginTop: '20%',
                paddingVertical: 15,
                borderRadius: 40,
              }}
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
    width: '20%',
  },
  btn: {
    backgroundColor: '#00BFFF',
    paddingHorizontal: 100,
    marginTop: '20%',
    paddingVertical: 15,
    borderRadius: 40,
  },
});
