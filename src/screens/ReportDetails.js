import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import {colors} from '../../config/color';
import Swipeout from 'react-native-swipeout';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import notifee, {TriggerType} from '@notifee/react-native';
import DatePicker from 'react-native-date-picker';
import {link} from '../../serve';

export default function ReportDetails({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [close, setClose] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [backgroundColor, setbackgroundColor] = useState(colors.white);
  const [textColor, setTextColor] = useState('#585858');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [take, setTake] = useState(false);
  const [skip, setSkip] = useState(false);
  const [updateId, setUpdateId] = useState();

  let cDay = date.getDate();
  let cMonth = date.getMonth() + 1;
  let cYear = date.getFullYear();
  let cHours = date.getHours();
  const formattedHours = (cHours % 12).toString().padStart(2, '0');
  let cMinutes = date.getMinutes();
  const text = `${
    cDay +
    '/' +
    cMonth +
    '/' +
    cYear +
    '(' +
    formattedHours +
    ':' +
    cMinutes +
    ')'
  }`;

  const fetchData = () => {
    fetch(link + 'r')
      .then(res => res.json())
      .then(results => {
        console.log('Res  ', results);
        setData(results);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
    setAnimate(false);
  }, []);

  setTimeout(() => {
    setAnimate(false);
  }, 2000);
  setTimeout(() => {
    setClose(false);
  }, 3000);

  const handleDelete = async id => {
    try {
      const res = await axios.delete(
        `${link}report-delete/${id}`,
      );
      if (res?.data) {
        console.log(res?.data);
        fetchData();
      }
    } catch (error) {
      console.log('Error in line 36  ', error?.response?.data);
    }
    setAnimate(true);
  };

  const renderList = item => {
    const medName = item.medName;

    const renderBtnDelete = () => {
      return (
        <>
          <TouchableOpacity
            onPress={() => handleDelete(item._id)}
            style={{
              backgroundColor: 'red',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={25}
              color="white"
            />
          </TouchableOpacity>
        </>
      );
    };

    const renderBtnClose = () => {
      return (
        <TouchableOpacity
          onPress={() => setClose(true)}
          style={{
            backgroundColor: colors.blue,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons name="close" size={25} color="white" />
        </TouchableOpacity>
      );
    };

    var swipeoutBtns = [
      {
        component: renderBtnDelete(),
      },
      {
        component: renderBtnClose(),
      },
    ];

    const modalOpen = () => {
      setModalVisible(true);
      setbackgroundColor(colors.blue);
      setTextColor(colors.white);
    };

    const movetoEditReport = () => {
      setModalVisible(false);
      navigation.navigate('Edit Report', {
        medName,
        updateId,
      });
    };

    return (
      <View style={styles.container}>
        <View style={styles.details} key={item._id}>
          <Swipeout
            right={swipeoutBtns}
            style={{backgroundColor: backgroundColor}}
            close={close}>
            <TouchableOpacity
              onPress={() => {
                modalOpen();
                setUpdateId(item._id);
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: textColor,
                    marginBottom: 10,
                    fontWeight: 'bold',
                  }}>
                  {item.medName}
                </Text>

                <Text
                  style={{
                    color: textColor,
                    marginBottom: 10,
                    fontWeight: 'bold',
                  }}>
                  ({item.medForm})
                </Text>
                {take ? (
                  <View
                    style={{
                      backgroundColor: colors.blue,
                      height: 15,
                      borderRadius: 7,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons name="check" color={colors.white} />
                  </View>
                ) : null}
                {skip ? (
                  <View
                    style={{
                      backgroundColor: colors.blue,
                      height: 13,
                      borderRadius: 7,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="minus-circle-outline"
                      color={colors.white}
                    />
                  </View>
                ) : null}
              </View>

              <Text style={{color: textColor, marginBottom: 10, bottom: 7}}>
                Next Reminder: {item.date}
              </Text>
            </TouchableOpacity>
          </Swipeout>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{flexDirection: 'row-reverse', right: 15, top: 10}}>
                  <TouchableOpacity onPress={modalClose}>
                    <MaterialCommunityIcons name="close" size={25} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={movetoEditReport}>
                    <MaterialCommunityIcons
                      name="pen"
                      size={25}
                      style={{marginRight: 20}}
                    />
                  </TouchableOpacity>
                </View>

                {item.medName ? (
                  <Text style={styles.modalText}>{item.medName}</Text>
                ) : null}

                <View style={{top: '35%'}}>
                  <View style={{flexDirection: 'row', marginLeft: 20}}>
                    <MaterialCommunityIcons
                      name="calendar"
                      size={25}
                      style={{marginRight: 10}}
                    />
                    <Text>Scheduled for {text}</Text>
                  </View>
                  <Text style={{marginLeft: 20}}>{String(date)}</Text>

                  <View
                    style={{flexDirection: 'row', marginLeft: 20}}
                    size={20}>
                    <MaterialCommunityIcons
                      name="pill"
                      style={{marginRight: 10}}
                      size={25}
                    />
                    <Text>{item.medForm}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 50,
                      justifyContent: 'space-around',
                      backgroundColor: '#EFF8FB',
                      paddingVertical: 30,
                    }}>
                    <TouchableOpacity style={styles.btn1} onPress={skipMed}>
                      <MaterialCommunityIcons
                        name="arrow-u-left-top"
                        size={40}
                        color={colors.blue}
                      />
                      <Text style={{textAlign: 'center', color: colors.blue}}>
                        SKIP
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn2} onPress={takeMed}>
                      <MaterialCommunityIcons
                        name="check"
                        size={40}
                        color={colors.blue}
                      />
                      <Text style={{textAlign: 'center', color: colors.blue}}>
                        TAKE
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.btn3}
                      onPress={() => setOpen(true)}>
                      <MaterialCommunityIcons
                        name="alarm"
                        size={40}
                        color={colors.blue}
                      />
                      <Text style={{textAlign: 'center', color: colors.blue}}>
                        Alarm
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={date => {
                      setOpen(false);
                      setDate(date);
                      console.log(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  };

  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: textColor,
        }}
      />
    );
  };

  const modalClose = () => {
    setModalVisible(false);
    setbackgroundColor('white');
    setTextColor('#585858');
  };

  const closeModaltakeMed = () => {
    setTimeout(() => {
      setModalVisible(false);
    }, 3000);
  };

  const takeMed = () => {
    setTake(true);
    Alert.alert('You take medicine');
    closeModaltakeMed();
    setbackgroundColor(colors.white);
    setTextColor('#585858');
  };

  const skipMed = () => {
    setSkip(true);
    Alert.alert('You forget to take medicine');
    closeModaltakeMed();
    setbackgroundColor(colors.white);
    setTextColor('#585858');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
        marginTop: 10,
      }}>
      <View style={{margin: 20, marginBottom: 10}}>
        <Text style={{fontWeight: '700', color: textColor}}>Active meds</Text>
      </View>
      <View style={styles.flatlistCon}>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return renderList(item);
          }}
          keyExtractor={item => item._id}
          onRefresh={() => fetchData()}
          refreshing={loading}
          ItemSeparatorComponent={ItemDivider}
        />
      </View>
      <ActivityIndicator animating={animate} color={colors.blue} size="large" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    marginTop: 10,
  },
  img: {
    width: 30,
    height: 30,
    margin: 20,
  },
  flatlistCon: {
    margin: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    height: '50%',
    width: '90%',
    borderRadius: 30,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    top: '25%',
    fontSize: 25,
    fontWeight: '600',
  },
  btn1: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: colors.blue,
    padding: 10,
  },
  btn2: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: colors.blue,
    padding: 10,
  },
  btn3: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: colors.blue,
    padding: 10,
  },
});
