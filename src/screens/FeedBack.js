import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native';
import RadioGroup, {RadioButton} from 'react-native-radio-buttons-group';

const radioButtonsData = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: '90%',
    value: 'option1',
  },
  {
    id: '2',
    label: '70%',
    value: 'option2',
  },
  {
    id: '3',
    label: '50%',
    value: 'option3',
  },
  {
    id: '4',
    label: '10%',
    value: 'option4',
  },
];

export default function FeedBack() {
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [suggestion, setSuggestion] = useState('');

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.lableText}>
          Overall, how do you feel about this app
        </Text>
        <View style={styles.radioBtns}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
          />
          {/* <RadioButton borderColor="red" /> */}
        </View>
        <View style={styles.inputCon}>
          <Text style={styles.lableText}>How could we improve our app</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setSuggestion(text)}
          />
          <Text style={{color: 'red'}}>{suggestion}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableHighlight
            underlayColor="#A9E2F3"
            style={styles.btn}
            onPress={() => Alert.alert('Thanks for your Feedback')}>
            <Text style={{color: 'white'}}>GIVE FEEDBACK</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  lableText: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 10,
    color: 'black',
    marginBottom: 10,
  },
  radioBtns: {
    marginRight: '80%',
    color: 'black',
  },
  inputCon: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    height: 140,
    width: '90%',
    marginLeft: '3%',
    color: 'gray',
  },
  btn: {
    backgroundColor: '#00BFFF',
    paddingHorizontal: 100,
    marginTop: '20%',
    paddingVertical: 15,
    borderRadius: 40,
  },
});
