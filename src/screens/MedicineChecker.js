// import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
// import React, {useState} from 'react';
// import axios from 'axios';
// import {colors} from '../../config/color';

// export default function App() {
//   const [input, setInput] = useState('');
//   const [convo, setConvo] = useState([]);

//   const handleClick = async () => {
//     let temp = convo;
//     temp.push({
//       user: 'user',
//       text: input,
//     });
//     setConvo([...convo]);
//     setInput('');

//     console.log('User: ' + input);

//     await axios
//       .post(link + 'api/chatbot', {message: input})
//       .then(res => {
//         let temp = convo;
//         temp.push({
//           user: 'bot',
//           text: res.data.message,
//         });

//         setConvo([...temp]);
//         console.log('Bot: ' + JSON.stringify(res));
//       });
//     console.log('CONVERSATION' + JSON.stringify(convo));
//   };
//   return (
//     <View style={styles.container}>
//       {convo.map((val, index) => {
//         if (val.user === 'user') {
//           return (
//             <View key={index} style={styles.talkBubbleSquareRight}>
//               <Text style={{color: 'red', textAlign: 'center'}}>
//                 {val.text}
//               </Text>
//             </View>
//           );
//         } else {
//           return (
//             <View key={index} style={styles.talkBubbleSquareLeft}>
//               <Text style={{color: 'green', textAlign: 'center'}}>
//                 {val.text}
//               </Text>
//             </View>
//           );
//         }
//       })}
//       <Text>Open up App.js to start working on your app!</Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={text => setInput(text)}
//         defaultValue={input}
//         placeholder="Ask me something!"
//       />
//       <Button
//         onPress={handleClick}
//         title="Learn More"
//         color="#841584"
//         accessibilityLabel="Learn more about this purple button"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
//   contentContainer: {
//     flex: 1, // pushes the footer to the end of the screen
//   },
//   text: {
//     textAlign: 'center',
//   },
//   talkBubbleSquareLeft: {
//     width: 280,
//     height: 100,
//     flex: 1,
//     borderTopRightRadius: 11,
//     borderBottomRightRadius: 5,
//     borderBottomLeftRadius: 5,
//     borderTopLeftRadius: 5,
//     marginTop: 10,
//     backgroundColor: 'black',
//   },
//   talkBubbleSquareRight: {
//     width: 280,
//     height: 100,
//     marginTop: 10,
//     flex: 1,
//     borderTopRightRadius: 5,
//     borderBottomRightRadius: 5,
//     borderBottomLeftRadius: 5,
//     borderTopLeftRadius: 11,
//     backgroundColor: 'blue',
//   },
// });

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {link} from '../../serve';

export default function MedicineChecker() {
  const [input, setInput] = useState('');
  const [convo, setConvo] = useState([]);
  const [resp, setResp] = useState('');
  const [botConvo, setBotConvo] = useState([]);

  const handleClick = async () => {
    console.log('Hello');

    let temp = convo;
    temp.push({
      user: 'user',
      text: input,
    });
    setConvo([...convo]);
    setInput('');

    console.log('User: ' + input);
    console.log('Bot: ' + convo);

    await axios.post(link + 'api/chatbot', {message: input}).then(res => {
      let temp = convo;

      temp.push({
        user: 'bot',
        text: res.data.message,
      });

      // setResp(res.data.message);
      setConvo([...temp]);
      console.log('Bot: ' + res.data.message);
      console.log(resp);
    });

    console.log(convo);
    console.log(resp);
  };

  return (
    <View style={styles.chatbotContainer}>
      <View style={styles.chatbotNav}>
        <Image />
        <Text style={{fontSize: 20, color: 'gray'}}>
          Hi there, how are you doing
        </Text>
      </View>

      <View style={{alignItems: 'flex-end', marginTop: 30}}>
        {convo.map((entry, idx) => {
          if (entry.user === 'user') {
            return (
              <View
                key={idx}
                style={{
                  padding: 10,
                  width: '60%',
                  alignItems: 'center',
                  borderRadius: 25,
                  marginTop: 10,
                  marginRight: 5,
                }}>
                <Text>{entry.text}</Text>
              </View>
            );
          } else {
            return (
              <View
                key={idx}
                style={{
                  padding: 10,
                  width: '60%',
                  alignItems: 'center',
                  borderRadius: 25,
                  marginTop: 10,
                  marginRight: 5,
                }}>
                <Text style={{color: 'red'}}>{entry.text}</Text>
              </View>
            );
          }
        })}
      </View>

      <View style={styles.InputCon}>
        <View>
          <TextInput
            placeholder="Enter your medicine.."
            style={styles.input}
            defaultValue={Text}
            onChangeText={text => setInput(text)}
          />
          <TouchableHighlight
            style={styles.btnSend}
            underlayColor="#81DAF5"
            onPress={handleClick}>
            <Text> This text </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  chatbotContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  chatbotNav: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  botAvatar: {
    display: 'flex',
    width: 120,
    height: 120,
  },
  convoCon: {},
  InputCon: {
    marginTop: '90%',
    flexDirection: 'row',
  },
  btnSend: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
  },
  input: {
    borderWidth: 1,
    width: '85%',
  },
});
