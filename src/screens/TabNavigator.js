import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {StyleSheet, Image} from 'react-native';
import Reminder from './Reminder';
import Doctor from './Doctor';
import More from './More';
import Notes from './OCR';
import {
  ReminderStackNavigator,
  DoctorStackNavigator,
  OcrStackNavigator,
  MoreStackNavigator,
} from './StackNavigator';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBarOptions={{
        activeTintColor: '#ffc0cb',
        inactiveTintColor: '#00BFFF',
        // activeBackgroundColor: '#00BFFF',
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 25,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 35,
          borderColor: '#00BFFF',
          height: 70,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Reminders"
        component={ReminderStackNavigator}
        options={({navigation}) => ({
          tabBarIcon: ({size, color}) => (
            <MaterialCommunityIcons name="alarm" size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Doctor"
        component={DoctorStackNavigator}
        options={({navigation}) => ({
          tabBarVisible: false,
          tabBarIcon: ({size, color, focused}) => (
            <MaterialCommunityIcons
              name="doctor"
              size={size}
              color={color}
              style={{
                tintColor: focused ? '#e32f45' : '#748c94',
                borderRadius: 35,
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Ocr"
        component={OcrStackNavigator}
        options={({navigation}) => ({
          tabBarVisible: false,
          tabBarIcon: ({size, color}) => (
            // <MaterialCommunityIcons
            //   name="document-scanner-rounded"
            //   size={size}
            //   color={color}
            // />
            <MaterialCommunityIcons
              name="text-recognition"
              size={size}
              color={color}
            />
          ),
        })}
      />
      <Tab.Screen
        name="More"
        component={MoreStackNavigator}
        options={({navigation}) => ({
          tabBarVisible: false,
          tabBarIcon: ({size, color}) => (
            <MaterialCommunityIcons
              name="dots-horizontal-circle-outline"
              size={size}
              color={color}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
  },
});
export default BottomTabNavigator;
