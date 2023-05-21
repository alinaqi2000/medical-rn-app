import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  TextInput,
  ImageBackground,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../config/color';

import axios from 'axios';
import Swipeout from 'react-native-swipeout';
import {link} from '../../serve';

export default function AppointmentDetails({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [clickColorChange, setclickColorChange] = useState(colors.white);
  const [updateId, setUpdateId] = useState();

  const fetchData = () => {
    fetch(link + '/a')
      .then(res => res.json())
      .then(results => {
        console.log('Res  ', results);
        setData(results);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  });

  const handleDelete = async id => {
    try {
      const res = await axios.delete(link + `/appointment-delete/${id}`);
      if (res?.data) {
        console.log(res?.data);
        fetchData();
      }
    } catch (error) {
      console.log('Error in line 36  ', error?.response?.data);
    }
  };

  const timer = () => {
    setTimeout(() => {
      setclickColorChange('#CEECF5');
    }, 3000);
  };

  const renderList = item => {
    const deleteBtn = () => {
      handleDelete(item._id);
      timer();
    };

    const updateBtn = () => {
      setUpdateId(item._id);
      navigation.navigate('Update Appointment', {
        updateId,
      });
    };

    return (
      <View style={styles.container}>
        <View style={styles.details} key={item._id}>
          <Text
            style={{color: colors.white, marginBottom: 10, fontWeight: 'bold'}}>
            Title: {item.title}
          </Text>
          <TouchableOpacity onPress={updateBtn}>
            <MaterialCommunityIcons
              name="pencil"
              color={clickColorChange}
              size={30}
              style={{position: 'absolute', right: 1, bottom: 1}}
            />
          </TouchableOpacity>
          <Text
            style={{color: colors.white, marginBottom: 10, fontWeight: 'bold'}}>
            Appointment Date: {item.date}
          </Text>
          <Text
            style={{color: colors.white, marginBottom: 10, fontWeight: 'bold'}}>
            Location: {item.location}
          </Text>

          <Text style={{color: colors.white, fontWeight: 'bold'}}>
            Notes: {item.notes}
          </Text>
          <TouchableOpacity onPress={deleteBtn}>
            <MaterialCommunityIcons
              name="delete-circle"
              color={clickColorChange}
              size={30}
              style={{position: 'absolute', right: 1, bottom: 1}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: '90%',
          backgroundColor: '#607D8B',
          alignSelf: 'center',
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF5FB',
  },
  details: {
    borderWidth: 1,
    height: 130,
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    borderColor: colors.gray,
    backgroundColor: '#00BFFF',
    elevation: 5,
    borderRadius: 20,
  },
});
