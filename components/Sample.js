import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function Sample() {
  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp', JSON.stringify(remoteMessage));
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
        }
      });
  }, []);
  return (
    <View>
      <Text></Text>
    </View>
  );
}
