import React, {Component, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import {TextInput, Button, Avatar} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import messaging from '@react-native-firebase/messaging';

import {utils} from '@react-native-firebase/app';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

export default class MyNetWOrk_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.getUserDetail();
  }

  componentDidMount() {
    try {
      const subscriber = firestore()
        .collection('users')
        .onSnapshot(querySnapshot => {
          const users = [];

          querySnapshot.forEach(documentSnapshot => {
            users.push({
              email: documentSnapshot.data().email,
              name: documentSnapshot.data().name,
              proPicUrl: documentSnapshot.data().proPicUrl,
              key: documentSnapshot.id,
            });
          });
          this.setState({
            data: users,
          });
          console.log(this.state.data[0]);
        });
    } catch (error) {
      Alert(error);
    }
  }

  getUserDetail = async () => {
    const proPicUrl = await AsyncStorage.getItem('proPicUrl');
    this.setState({
      proPic: proPicUrl,
    });
  };

  cloudMessage = () => {
    useEffect(() => {
      messaging().onMessage(async remoteMessage => {
        console.log(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );
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
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.contaiiner}>
            <View style={styles.topSection}>
              <Avatar.Image
                // source={require('../assets/img/pro.png')}
                source={{uri: this.state.proPic}}
                resizeMode="contain"
                size={45}
                style={styles.proPic}
              />
              <TextInput
                left={<TextInput.Icon color="gray" name="account-search" />}
                activeUnderlineColor="gray"
                placeholder={'Search'}
                style={styles.search}
              />
              <Image
                source={require('../assets/icon/message.png')}
                resizeMode="contain"
                style={styles.message}
              />
            </View>

            <View style={styles.flatListSrction}>
              <FlatList
                data={this.state.data}
                renderItem={({item}) => (
                  <View style={styles.fatList}>
                    <View style={styles.section}>
                      <View style={styles.userSection}>
                        <Avatar.Image
                          source={{uri: item.proPicUrl}}
                          resizeMode="contain"
                          size={80}
                          style={styles.postProPic}
                        />
                        <View>
                          <Text style={styles.ownerName}>{item.name}</Text>
                        </View>

                        <Button
                          uppercase={false}
                          style={styles.connectBtn}
                          mode="contained"
                          onPress={() => {}}>
                          <Text style={styles.witetxt}>Connect</Text>
                        </Button>
                      </View>
                    </View>
                    {/* <View style={styles.section}>
                      <View style={styles.userSection}>
                        <Avatar.Image
                          source={{uri: item.proImgirl}}
                          resizeMode="contain"
                          size={80}
                          style={styles.postProPic}
                        />
                        <View>
                          <Text style={styles.ownerName}>{item.ownerName}</Text>
                        </View>

                        <Button
                          uppercase={false}
                          style={styles.connectBtn}
                          mode="contained"
                          onPress={() => {}}>
                          <Text style={styles.witetxt}>Connect</Text>
                        </Button>
                      </View>
                    </View> */}
                  </View>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contaiiner: {
    alignItems: 'center',
  },
  topSection: {
    width: 400,
    height: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  proPic: {
    width: 45,
    height: 45,
    borderRadius: 100,
    marginLeft: 10,
    marginRight: 10,
  },
  search: {
    width: 270,
    justifyContent: 'center',
    height: 40,
    fontSize: 12,
    marginRight: 10,
    backgroundColor: 'white',
  },
  message: {
    width: 40,
  },
  title: {
    fontSize: 32,
    alignSelf: 'center',
    marginBottom: 10,
  },
  flatListSrction: {
    height: 600,
  },
  fatList: {
    height: 250,
    width: 400,
    flex: 6,
    flexDirection: 'row',
    borderBottomColor: 'black',
    marginBottom: 2,
    flexDirection: 'row',
  },
  section: {
    marginLeft: 5,
    width: 187,
    height: 247,
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 6,
  },
  id: {
    display: 'none',
  },
  ownerName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  connectBtn: {
    width: 120,
    height: 35,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    borderColor: '#1569C7',
    borderWidth: 0.3,
  },
  witetxt: {
    color: '#1569C7',
    fontSize: 12,
  },
});
