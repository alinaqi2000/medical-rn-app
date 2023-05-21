import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  ImageBackground,
  Alert,
} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';
import {link} from '../../serve';

const OCR = ({navigation, route}) => {
  const getDetails = type => {
    if (route.params) {
      switch (type) {
        case 'text':
          return route.params.text;
      }
    }
    return '';
  };
  const [image, setImage] = useState(null);
  const [text, setText] = useState(getDetails('text'));
  const [camera, setCamera] = useState(null);
  const [textMsg, settextMsg] = useState(false);

  useEffect(() => {
    (async () => {
      if (image) {
        const result = await TextRecognition.recognize(image.assets[0].uri);
        console.log(result);
        setText(result);
      }
    })();
  }, [image]);

  // const imagePickFromGallery = () => {
  //   setTimeout(() => {
  //     launchImageLibrary({}, setImage);
  //   }, 2000);
  // };

  const handleImage = () => {
    launchImageLibrary({}, setImage);
  };

  const handleCamera = () => {
    launchCamera({}, setCamera);
    // navigation.navigate('OcrResults');
    // // navigation.navigate({text}, 'OcrResults');
  };
  useEffect(() => {
    (async () => {
      if (camera) {
        const result = await TextRecognition.recognize(camera.assets[0].uri);
        console.log(result);
        setText(result);
      }
    })();
  }, [camera]);

  const handleView = () => {
    var errorFlag = false;
    if (text) {
      errorFlag = true;
      settextMsg(false);
      navigation.navigate('OcrResults', {text});
    } else {
      errorFlag = false;
      settextMsg(true);
    }
  };

  const handleSubmit = () => {
    submitData();
    handleView();
  };

  const submitData = () => {
    fetch(link + 'send-ocrData', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        Alert.alert(`${data.text} is saved successfully`);
      });
  };
  console.log(text);
  {
    text ? Alert.alert('Scanning is done 🙂') : null;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/ocr.gif')}
        style={{width: 400, height: 400}}
      />
      {/* {text ? <Text style={{color: 'red'}}>{text}</Text> : null} */}
      {text
        ? null
        : textMsg && (
            <Text style={{color: 'red', textAlign: 'center'}}>
              {'Text is not scanned 🙁'}
            </Text>
          )}
      <TouchableHighlight
        onPress={handleCamera}
        style={styles.btn}
        underlayColor="#81DAF5">
        <Text style={styles.text}>Open Camera</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={handleImage}
        style={styles.btn}
        underlayColor="#81DAF5">
        <Text style={styles.text}>Upload from gallery</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={handleSubmit}
        style={styles.btn}
        underlayColor="#81DAF5">
        <Text style={styles.text}>View</Text>
      </TouchableHighlight>
      {/* {text ? <Text style={{color: 'white'}}>{text}</Text> : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#00BFFF',
    padding: 20,
    marginBottom: 20,
    width: '70%',
    borderRadius: 200,
  },
});
export default OCR;
