import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import TimeLine_Form from './TimeLine_Form';
import MyNetWork_Form from './MyNetWork_Form';
import UploadPost_Form from './UploadPost_Form';
import Notification_Form from './Notification_Form';
import Jobs_Form from './Jobs_Form';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default class Home_Page extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Tab.Navigator
        animationType="slide"
        style={style.tabBar}
        screenOptions={{tabBarShowLabel: false}}>
        <Tab.Screen
          name="TimeLine_Form"
          component={TimeLine_Form}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 0,
                }}>
                <Image
                  source={require('../assets/icon/home.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? 'black' : '#748c94',
                  }}
                />
                <Text
                  style={{color: focused ? 'black' : '#748c94', fontSize: 14}}>
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="MyNetWork_Form"
          component={MyNetWork_Form}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 0,
                }}>
                <Image
                  source={require('../assets/icon/network.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? 'black' : '#748c94',
                  }}
                />
                <Text
                  style={{color: focused ? 'black' : '#748c94', fontSize: 14}}>
                  My Network
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="UploadPost_Form"
          component={UploadPost_Form}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 0,
                }}>
                <Image
                  source={require('../assets/icon/joyent.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? 'black' : '#748c94',
                  }}
                />
                <Text
                  style={{color: focused ? 'black' : '#748c94', fontSize: 14}}>
                  Post
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Notification_Form"
          component={Notification_Form}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 0,
                }}>
                <Image
                  source={require('../assets/icon/notification.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? 'black' : '#748c94',
                  }}
                />
                <Text
                  style={{color: focused ? 'black' : '#748c94', fontSize: 14}}>
                  Notipication
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Jobs_Form"
          component={Jobs_Form}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 0,
                }}>
                <Image
                  source={require('../assets/icon/job.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? 'black' : '#748c94',
                  }}
                />
                <Text
                  style={{color: focused ? 'black' : '#748c94', fontSize: 14}}>
                  Jobs
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const style = StyleSheet.create({
  tabBar: {
    height: 0,
  },
  img: {
    width: 36,
    top: 0,
    height: 36,
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
