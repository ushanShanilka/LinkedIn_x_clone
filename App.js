import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import SignUp_Form from './components/SignUp_Form';
import SignIn_Form from './components/SignIn_Form';
import Home_Page from './components/Home_Page';
import Loading_From from './components/Loading_From';
import Sample from './components/Sample';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();

export default function App() {
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('...........................', token);
  };
  // useEffect(() => {
  //   getToken();
  //   messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log('onNotificationOpenedApp', JSON.stringify(remoteMessage));
  //   });

  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           JSON.stringify(remoteMessage),
  //         );
  //       }
  //     });
  // }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PondScreen"
        headerMode="none"
        mode="card">
        <Stack.Screen
          name="Loading_From"
          component={Loading_From}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signin"
          component={SignIn_Form}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp_Form}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainHome"
          component={Home_Page}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default class App extends Component {
//   render() {
//     return (
// <NavigationContainer>
//   <Stack.Navigator
//     initialRouteName="PondScreen"
//     headerMode="none"
//     mode="card">
//     <Stack.Screen
//       name="Loading_From"
//       component={Loading_From}
//       options={{headerShown: false}}
//     />
//     <Stack.Screen
//       name="Signin"
//       component={SignIn_Form}
//       options={{headerShown: false}}
//     />
//     <Stack.Screen
//       name="SignUp"
//       component={SignUp_Form}
//       options={{headerShown: false}}
//     />
//     <Stack.Screen
//       name="MainHome"
//       component={Home_Page}
//       options={{headerShown: false}}
//     />
//   </Stack.Navigator>
// </NavigationContainer>
//     );
//   }
// }
