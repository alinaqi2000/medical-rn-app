import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {
  Button,
  View,
  FlatList,
  Modal,
  StyleSheet,
  TouchableNativeFeedback,
  Text,
} from 'react-native';

const ReactCheckBox = props => {
  let list = [
    {id: 1, status: false, value: 'MONDAY'},
    {id: 2, status: false, value: 'TUESDAY'},
    {id: 3, status: false, value: 'WEDNESDAY'},
    {id: 4, status: false, value: 'THURSDAY'},
    {id: 5, status: false, value: 'FRIDAY'},
    {id: 6, status: false, value: 'SATURDAY'},
    {id: 7, status: false, value: 'SUNDAY'},
  ];

  const [listItem, setListItem] = React.useState(list);
  const [saveData, setSaveData] = useState('');

  const selectItem = selectedItem => {
    let updatedList = listItem.map(item => {
      if (item.id === selectedItem.id) {
        return selectedItem.status === true
          ? {
              ...selectedItem,
              status: false,
            }
          : {
              ...selectedItem,
              status: true,
            };
      } else {
        return {
          ...item,
        };
      }
    });
    setListItem(updatedList);
  };

  //   listItem.forEach(item => console.log(item));
  const handleSave = () => {
    setListItem(listItem);
  };

  const selectAll = () => {
    setListItem(
      listItem.map(item => ({id: item.id, value: item.value, status: true})),
    );
  };

  return (
    <View>
      <View>
        <Modal
          backdropColor={'green'}
          backdropOpacity={1}
          animationType="slide"
          transparent={true}
          visible={props.show}
          onRequestClose={() => {
            // props.show(!props.modalVisible);
            props.setShow(!props.show);
          }}>
          <View style={styles.container}>
            <View style={styles.container2}>
              <Text
                style={{
                  fontSize: 18,
                  bottom: 10,
                  color: '#424242',
                  right: 15,
                  fontWeight: 'bold',
                }}>
                Select days
              </Text>
              {listItem.map(item => (
                <View style={{flexDirection: 'row', top: 10}}>
                  <CheckBox
                    tintColor={{true: '#F15927', false: 'red'}}
                    style={{borderColor: 'white'}}
                    value={item?.status}
                    key={item.id}
                    onValueChange={newValue => {
                      //   console.log('toggleCheckBox', newValue);
                      // setToggleCheckBox(!toggleCheckBox);
                      selectItem(item);
                    }}
                  />
                  <Text style={{top: 5, color: '#424242'}}>{item.value}</Text>
                </View>
              ))}

              <View style={styles.btnContainer}>
                <TouchableNativeFeedback onPress={selectAll}>
                  <Text style={styles.button}>SELECT ALL</Text>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback
                  onPress={() => props.setShow(!props.show)}>
                  <Text style={styles.button2}>CANCEL</Text>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={handleSave}>
                  <Text style={styles.button3}>SAVE</Text>
                </TouchableNativeFeedback>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '50%',
    elevation: 200,
  },
  container2: {
    backgroundColor: 'white',
    padding: 28,
    marginLeft: 30,
    marginRight: 30,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 20,
    right: 20,
    color: 'black',
  },
  button: {
    color: '#20b2aa',
    marginTop: 20,
    fontWeight: 'bold',
    left: 5,
  },
  button2: {
    color: '#20b2aa',
    marginTop: 20,
    marginLeft: 20,
    fontWeight: 'bold',
    left: 60,
  },
  button3: {
    color: '#20b2aa',
    marginTop: 20,
    marginLeft: 40,
    fontWeight: 'bold',
    left: 50,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     marginTop: '50%',
//   },
//   container2: {
//     padding: 10,
//     backgroundColor: '#20b2aa',
//     marginTop: '50%',
//     marginLeft: 20,
//     marginRight: 20,
//   },
//   input: {
//     margin: 10,
//     height: 40,
//     borderColor: '#20b2aa',
//     borderBottomWidth: 1,
//   },
//   button: {
//     color: 'white',
//     marginTop: 20,
//     fontWeight: 'bold',
//   },
//   button2: {
//     color: 'white',
//     marginTop: 20,
//     marginLeft: 80,
//     fontWeight: 'bold',
//   },
//   button3: {
//     color: 'white',
//     marginTop: 20,
//     marginLeft: 40,
//     fontWeight: 'bold',
//   },
//   btnContainer: {
//     marginLeft: 17,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   checkBox: {
//     color: 'white',
//     marginBottom: 5,
//   },
// });

export default ReactCheckBox;
