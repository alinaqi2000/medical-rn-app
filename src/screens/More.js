import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MoreCom from '../components/more/MoreCom';

export default function More({navigation}) {
  return (
    <View style={styles.container}>
      <MoreCom
        onPress={() => navigation.navigate('QrCode')}
        name="qrcode-scan"
        title="QR CODE SCANNER"
      />
      <MoreCom
        onPress={() => navigation.navigate('Report')}
        name="poll"
        title="REPORT"
      />
      <MoreCom
        onPress={() => navigation.navigate('FeedBack')}
        name="comment-quote-outline"
        title="FEEDBACK"
      />
      <MoreCom
        onPress={() => navigation.navigate('Appointments')}
        name="calendar-star"
        title="APPOINTMENT"
      />
      <MoreCom
        onPress={() => navigation.navigate('Prescription')}
        name="pen"
        title="PRESCRIPTION"
      />
      <MoreCom
        onPress={() => navigation.navigate('Medicine Checker')}
        name="search-web"
        title="MEDICINE CHECKER"
      />
      <View style={styles.line}></View>
      <MoreCom
        onPress={() => navigation.navigate('Setting')}
        name="cog"
        title="SETTING"
      />
      <MoreCom
        onPress={() => console.log('Hello')}
        name="help-circle-outline"
        title="HELP & SUPPORT"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  imgStyle: {
    width: 20,
    height: 20,
  },
  // container2: {
  //   marginTop: 40,
  //   padding: 20,
  // },
  // text: {
  //   fontSize: 15,
  //   marginLeft: 40,
  //   top: 3,
  //   fontWeight: 'bold',
  // },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#BDBDBD',
    marginBottom: 30,
    marginTop: 20,
  },
});
