import {useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {colors} from '../../config/color';
import {link} from '../../serve';

const DoctorsDetail = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const [animate, setAnimate] = useState(false);
  const [updateId, setUpdateId] = useState();

  const handleDelete = async id => {
    try {
      const res = await axios.delete(link + `doctor-delete/${id}`);
      if (res?.data) {
        console.log(res?.data);
        fetchData();
      }
    } catch (error) {
      console.log('Error in line 36  ', error?.response?.data);
    }
  };

  const fetchData = () => {
    fetch(link + 'd')
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
    const timer = () => {
      setTimeout(() => {
        setAnimate(false);
      }, 2000);
    };

    const handleUpdateBtn = () => {
      setAnimate(true);
      setUpdateId(item._id);
      navigation.navigate('Edit Doctor Detail', {
        updateId,
      });
      timer();
    };

    const handleDeleteBtn = () => {
      setAnimate(true);
      handleDelete(item._id);
      timer();
    };

    return (
      <View style={styles.container}>
        <View style={styles.details}>
          <View style={styles.btn}>
            <TouchableOpacity onPress={handleUpdateBtn} style={{right: 230}}>
              <MaterialCommunityIcons
                name="lead-pencil"
                color={colors.white}
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteBtn}>
              <MaterialCommunityIcons
                name="delete-empty"
                color={colors.white}
                size={30}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text
              style={{
                color: colors.white,
                marginBottom: 10,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Name: {item.name}
            </Text>

            <Text
              style={{
                color: colors.white,
                marginBottom: 10,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Speciality: {item.speciality}
            </Text>
            <Text
              style={{
                color: colors.white,
                marginBottom: 10,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Phone No: {item.phone}
            </Text>
            <Text
              style={{
                color: colors.white,
                marginBottom: 10,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Email: {item.email}
            </Text>

            <Text
              style={{
                color: colors.white,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Address: {item.address}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      {/* <ImageBackground
        source={require('../assets/backImg2.jpg')}
        resizeMode="cover"
        style={{height: '100%'}}> */}
      <View style={{height: '100%', backgroundColor: 'white'}}>
        <View style={styles.container}>
          <ActivityIndicator size={30} animating={animate} />
          <ScrollView>
            <FlatList
              data={data}
              renderItem={({item}) => {
                return renderList(item);
              }}
              keyExtractor={item => item._id}
              onRefresh={() => fetchData()}
              refreshing={loading}
              showsVerticalScrollIndicator={true}
            />
          </ScrollView>
        </View>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,

    // justifyContent: 'center',
  },
  details: {
    borderColor: '#00BFFF',
    height: 200,
    width: 300,
    borderWidth: 1,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    backgroundColor: colors.blue,
    borderRadius: 20,
  },
  btn: {
    bottom: '2%',
    left: '60%',
    flexDirection: 'row',
  },
});
export default DoctorsDetail;
