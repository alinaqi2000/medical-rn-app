import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {colors} from '../../config/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Swipeout from 'react-native-swipeout';
import {link} from '../../serve';

function OcrResults() {
  const route = useRoute();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [close, setClose] = useState(false);

  const fetchData = () => {
    fetch(link + 'o')
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

  const renderList = item => {
    const handleDelete = async id => {
      try {
        const res = await axios.delete(`${link}/ocr-delete/${id}`);
        if (res?.data) {
          console.log(res?.data);
          fetchData();
        }
      } catch (error) {
        console.log('Error in line 36  ', error?.response?.data);
      }
    };
    const deleteBtn = () => {
      handleDelete(item._id);
    };

    const renderBtnDelete = () => {
      return (
        <>
          <TouchableOpacity
            onPress={deleteBtn}
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
            backgroundColor: colors.pink,
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

    return (
      <View style={styles.container} key={item._id}>
        <Swipeout
          right={swipeoutBtns}
          style={{backgroundColor: colors.white}}
          close={close}>
          <View style={styles.details}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              {item.text}
            </Text>
          </View>
        </Swipeout>
        <View
          style={{
            height: 1,
            width: '90%',
            backgroundColor: '#607D8B',
            alignSelf: 'center',
          }}
        />
      </View>
    );
  };
  return (
    <View>
      {/* <Text style={{color: 'red'}}>{route.params.text}</Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 30,
          marginLeft: '5%',
          fontWeight: '600',
        }}>
        OCR Results:
      </Text>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.details}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              {route.params.text}
            </Text>
            <Text>{data}</Text>
          </View>
          <View
            style={{
              height: 1,
              width: '90%',
              backgroundColor: '#607D8B',
              alignSelf: 'center',
            }}
          />
        </View>
      </ScrollView> */}
      <FlatList
        data={data}
        renderItem={({item}) => {
          return renderList(item);
        }}
        keyExtractor={item => item._id}
        onRefresh={() => fetchData()}
        refreshing={loading}
      />
      <View style={styles.details2}>
        <Text style={{color: 'white', textAlign: 'center'}}>
          {route.params.text}
        </Text>
      </View>
      <View
        style={{
          height: 1,
          width: '90%',
          backgroundColor: '#607D8B',
          alignSelf: 'center',
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
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
  details2: {
    borderWidth: 1,
    height: 280,
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    borderColor: colors.gray,
    backgroundColor: '#00BFFF',
    elevation: 5,
    borderRadius: 20,
  },
});
export default OcrResults;
