import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Button,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeout from 'react-native-swipeout';
import {colors} from '../../config/color';
import {Card, Title, Paragraph} from 'react-native-paper';
import axios from 'axios';
import {link} from '../../serve';

export default function PrescriptionDetails({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [notes, setNotes] = useState([]);
  const [close, setClose] = useState(false);
  const [updateId, setUpdateId] = useState();

  const fetchData = () => {
    fetch(link + 'p')
      .then(res => res.json())
      .then(results => {
        setData(results);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  });

  const renderList = item => {
    const handleDelete = async id => {
      try {
        const res = await axios.delete(`${link}prescription-delete/${id}`);
        if (res?.data) {
          console.log(res?.data);
          fetchData();
        }
      } catch (error) {
        console.log('Error in line 36  ', error?.response?.data);
      }
    };

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

    const movetoEditPrescription = () => {
      setUpdateId(item._id);
      navigation.navigate('Edit Prescription', {
        updateId,
      });
    };

    const renderBtnUpdate = () => {
      return (
        <>
          <TouchableOpacity
            onPress={movetoEditPrescription}
            style={{
              backgroundColor: '#ffc0cb',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons name="pen" size={25} color="white" />
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
        component: renderBtnUpdate(),
      },
      {
        component: renderBtnClose(),
      },
    ];

    return (
      <View style={styles.container}>
        <Swipeout
          right={swipeoutBtns}
          close={close}
          style={{backgroundColor: '#E0F2F7'}}>
          <View style={styles.details} key={item._id}>
            <Text
              style={{
                color: '#585858',
                marginBottom: 10,
                fontWeight: 'bold',
              }}>
              Medicine Name: {item.medName}
            </Text>
            <Text
              style={{
                color: '#585858',
                marginBottom: 10,
                fontWeight: 'bold',
              }}>
              Prescription: {item.prescriptionDetails}
            </Text>
          </View>
        </Swipeout>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../assets/backImage.jpeg')}
      resizeMode="cover"
      style={{height: '100%'}}>
      <ScrollView>
        <View>
          <FlatList
            nestedScrollEnabled
            data={data}
            renderItem={({item}) => {
              return renderList(item);
            }}
            keyExtractor={item => item._id}
            onRefresh={() => fetchData()}
            refreshing={loading}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  //   details: {
  //     marginLeft: 20,
  //     padding: 10,
  //     marginRight: 20,
  //     borderBottomWidth: 1,
  //     borderColor: '#00BFFF',
  //   },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 15,
  },
  details: {
    marginTop: 10,
    width: 200,
    height: 150,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //   flatlist: {
  //     marginTop: 40,
  //   },
});
