import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import React from 'react';
import {connect} from 'react-redux';
import {deleteAlarm} from '../../../actions/alarm';

const ListAlarms = props => {
  const KeyExtractor = (item, index) => index.toString();
  const renderItem = ({item}) => {
    return (
      <>
        <Text style={styles.titleStyle}>{item.time.toString()}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#778899', fontSize: 20}}>
            {item.date.toString()}
          </Text>
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => {
              props.delete(item.value);
              //   console.log('Hello');
            }}>
            <Text style={{color: 'white'}}>REMOVE</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomWidth: 2,
            width: '90%',
            marginTop: 20,
            marginBottom: 20,
            borderBottomColor: '#a9a9a9',
          }}></View>
      </>
    );
  };
  return (
    <FlatList
      keyExtractor={KeyExtractor}
      data={props.alarms}
      renderItem={renderItem}
    />
  );
};

const mapStateToProps = state => {
  return {
    alarms: state.alarms.alarms,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    delete: value => {
      dispatch(deleteAlarm(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListAlarms);

const styles = StyleSheet.create({
  container: {},
  titleStyle: {fontSize: 30, color: '#283747'},
  removeBtn: {
    backgroundColor: '#ffc0cb',
    padding: 15,
    marginLeft: 170,
    bottom: '9%',
  },
});
