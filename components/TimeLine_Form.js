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
  StatusBar,
  Alert,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  TextInput,
  IconButton,
  Colors,
  Button,
  Avatar,
} from 'react-native-paper';
import RNRestart from 'react-native-restart';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const startReload = () => RNRestart.Restart();

export default class TimeLine_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      proPic: 'proPicUrl',
      postProPic: 'null',
      displayName: '',
      email: '',
    };
    this.getUserDetail();
  }

  getUserDetail = async () => {
    const proPicUrl = await AsyncStorage.getItem('proPicUrl');
    const displayName = await AsyncStorage.getItem('displayName');
    const email = await AsyncStorage.getItem('email');

    this.setState({
      proPic: proPicUrl,
      displayName: displayName,
      email: email,
    });
    this.getAllPost();
  };

  getAllPost = () => {
    try {
      const subscriber = firestore()
        .collection(`posts.${this.state.email}`)
        .onSnapshot(querySnapshot => {
          const posts = [];

          querySnapshot.forEach(documentSnapshot => {
            posts.push({
              dateAndTime: documentSnapshot.data().dateAndTime,
              uploadImg: documentSnapshot.data().imgUrl,
              ownerName: documentSnapshot.data().ownerName,
              txtAbout: documentSnapshot.data().txtAbout,
              proImgirl: documentSnapshot.data().proimgUrl,
              key: documentSnapshot.id,
            });
          });
          this.setState({
            data: posts,
          });
        }, 1000);
    } catch (error) {
      Alert(error);
    }
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
                onPress={this.userLogOut}
              />
            </View>
            <View style={styles.newFeed}>
              <FlatList
                data={this.state.data}
                renderItem={({item}) => (
                  <View style={styles.fatList}>
                    <View style={styles.postTop}>
                      <Avatar.Image
                        // source={require('../assets/img/pro.png')}
                        source={{uri: item.proImgirl}}
                        resizeMode="contain"
                        size={35}
                        style={styles.postProPic}
                      />
                      <View>
                        <Text style={styles.ownerName}>{item.ownerName}</Text>
                        <Text style={styles.dateAndTime}>
                          {item.dateAndTime}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.id}>ID: {item.key}</Text>
                    <Text style={styles.txtAbout}>{item.txtAbout}</Text>
                    <Image
                      source={{uri: item.uploadImg}}
                      resizeMode="contain"
                      style={styles.postImg}
                    />

                    <View style={styles.postBottom}>
                      <IconButton
                        icon="heart-outline"
                        color="gray"
                        size={20}
                        onPress={this.refershMethod}
                        style={styles.postBottomBtn}
                      />
                      <IconButton
                        icon="comment-processing-outline"
                        color="gray"
                        size={20}
                        onPress={() => console.log('Pressed')}
                        style={styles.postBottomBtn}
                      />
                      <IconButton
                        icon="share"
                        color="gray"
                        size={20}
                        onPress={() => console.log('Pressed')}
                        style={styles.postBottomBtn}
                      />
                      <IconButton
                        icon="send"
                        color="gray"
                        size={20}
                        onPress={() => console.log('Pressed')}
                        style={styles.postBottomBtn}
                      />
                    </View>
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
    shadowColor: '#7F5DF0',
    shadowOffset: {
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5,
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
  newFeed: {
    height: 600,
  },
  fatList: {
    height: 550,
    flex: 1,
    width: 380,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 0,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  id: {
    display: 'none',
  },
  ownerName: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  postImg: {
    width: 360,
    height: 400,
    borderWidth: 1,
  },
  dateAndTime: {
    fontSize: 10,
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: 10,
  },
  txtAbout: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 6,
    marginBottom: 8,
    marginTop: 8,
  },
  postBottom: {
    flexDirection: 'row',
    width: 380,
    marginTop: 15,
    alignSelf: 'flex-start',
    borderTopWidth: 0.2,
  },
  postBottomBtn: {
    marginRight: 75,
  },
  postTop: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
  postProPic: {
    marginRight: 3,
  },
});
