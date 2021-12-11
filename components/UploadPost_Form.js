import React, {Component} from 'react';
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
  Alert,
} from 'react-native';
import {
  IconButton,
  Button,
  TextInput,
  Colors,
  Avatar,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Textarea from 'react-native-textarea';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UploadPost_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateAndTime: '',
      uploadImg: '',
      ownerName: '',
      textArea: '',
      proPic: 'D:ProjectFire BaseLinkedIn_x_cloneassetsicondefaultUser.png',
      imageName: '',
      email: '',
    };

    this.getData();
  }

  getData = async () => {
    try {
      const displayName = await AsyncStorage.getItem('displayName');
      const proPicUrl = await AsyncStorage.getItem('proPicUrl');
      const email = await AsyncStorage.getItem('email');
      console.log(email);
      if (displayName != null) {
        this.setState({
          ownerName: displayName,
          proPic: proPicUrl,
          email: email,
        });
      } else {
        console.log('Data ne!');
        Alert.alert('Chek And Try Again');
      }
    } catch (e) {
      console.log('Data ne!');
      Massage;
    }
  };

  navigateTimeLine = () => {
    this.props.navigation.navigate('TimeLine_Form');
  };

  uploadImgFromGalarry = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      if (image.path != null) {
        const styles = StyleSheet.create({
          tempUploadImg: {
            display: 'flex',
          },
        });
        this.setState({
          uploadImg: image.path,
        });
        this.setState({
          imageName: image.modificationDate,
        });
        this.uploadImage();
      } else {
        console.log('Empty');
      }
    });
  };

  uploadVideoFromGallary = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      console.log(video);
    });
  };

  uploadImage = async () => {
    const fileName = this.state.imageName + '.jpg';

    const reference = storage().ref(`/images/${this.state.email}/${fileName}`);
    await reference.putFile(this.state.uploadImg);

    const url = await storage()
      .ref(`/images/${this.state.email}/${fileName}`)
      .getDownloadURL();
    console.log(url);
    this.setState({
      uploadImg: url,
    });
    await AsyncStorage.setItem('uploadImg', url);
  };

  savePost = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours(); //To get the Current Hours
    var min = new Date().getMinutes(); //To get the Current Minutes
    var sec = new Date().getSeconds(); //To get the Current Seconds

    const today =
      date +
      '-' +
      month +
      '-' +
      year +
      '(' +
      hours +
      '-' +
      min +
      '-' +
      sec +
      ')';
    this.setState({dateAndTime: today});

    firestore()
      .collection(`posts.${this.state.email}`)
      .add({
        dateAndTime: today,
        imgUrl: this.state.uploadImg,
        ownerName: this.state.ownerName,
        txtAbout: this.state.textArea,
        proimgUrl: this.state.proPic,
        email: this.state.email,
      })
      .then(() => {
        Alert.alert('Posted!');
        console.log('User added!');
        this.props.navigation.navigate('TimeLine_Form');
      });
  };

  clear = () => {
    this.setState({
      textArea: '',
    });
  };

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.mainContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.contaiiner}>
              <View style={styles.topSection}>
                <View style={styles.topSectionLeft}>
                  <IconButton
                    icon="close"
                    color={Colors.black}
                    size={20}
                    onPress={this.navigateTimeLine}
                  />
                  <Text style={styles.topic}>Share post</Text>
                </View>
                <View style={styles.topSectionRight}>
                  <Text style={styles.lblpost} onPress={this.savePost}>
                    Post
                  </Text>
                </View>
              </View>

              <View style={styles.uploadSection}>
                <Avatar.Image
                  size={50}
                  style={styles.proPic}
                  source={{uri: this.state.proPic}}
                />
                <Text style={styles.ownerName}>{this.state.ownerName}</Text>
              </View>

              <View>
                <Textarea
                  containerStyle={styles.inputArea}
                  style={styles.textarea}
                  onChangeText={text => this.setState({textArea: text})}
                  defaultValue={this.state.text}
                  maxLength={120}
                  placeholder={'What do you want to talk about?'}
                  placeholderTextColor={'#c7c7c7'}
                  underlineColorAndroid={'transparent'}
                />

                <View style={styles.addSomBtn}>
                  <Text
                    style={styles.witetxt}
                    onPress={this.uploadImgFromGalarry}>
                    <Image
                      source={require('../assets/icon/image.png')}
                      resizeMode="contain"
                      style={styles.btnLogo}
                    />
                    Add a phooto
                  </Text>

                  <Text
                    style={styles.witetxt}
                    onPress={this.uploadVideoFromGallary}>
                    <Image
                      source={require('../assets/icon/video.png')}
                      resizeMode="contain"
                      style={styles.btnLogo}
                    />
                    Take a video
                  </Text>

                  <Text
                    style={styles.witetxt}
                    onPress={() => {
                      console.log('Add a document');
                    }}>
                    <Image
                      source={require('../assets/icon/celebrate.png')}
                      resizeMode="contain"
                      style={styles.btnLogo}
                    />
                    Add a document
                  </Text>

                  <Text
                    style={styles.witetxt}
                    onPress={() => {
                      console.log('Share that you"re hiring');
                    }}>
                    <Image
                      source={require('../assets/icon/bag.png')}
                      resizeMode="contain"
                      style={styles.btnLogo}
                    />
                    Share that you're hiring
                  </Text>

                  <Text
                    style={styles.witetxt}
                    onPress={() => {
                      console.log('Find a expert');
                    }}>
                    <Image
                      source={require('../assets/icon/contacts.png')}
                      resizeMode="contain"
                      style={styles.btnLogo}
                    />
                    Find a expert
                  </Text>

                  <Text
                    style={styles.witetxt}
                    onPress={() => {
                      console.log('Create a poll');
                    }}>
                    <Image
                      source={require('../assets/icon/prahraph.png')}
                      resizeMode="contain"
                      style={styles.btnLogo}
                    />
                    Create a poll
                  </Text>

                  <Text
                    style={styles.witetxt}
                    onPress={() => {
                      console.log('Create an event');
                    }}>
                    <Image
                      source={require('../assets/icon/calendar.png')}
                      resizeMode="contain"
                      style={styles.btnLogo}
                    />
                    Create an event
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {},
  contaiiner: {},
  topSection: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  topSectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
  },
  topSectionRight: {
    alignItems: 'flex-end',
    width: 200,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  topic: {
    fontSize: 18,
    color: 'black',
    marginLeft: 20,
  },
  lblpost: {
    textAlign: 'center',
    color: 'black',
    marginRight: 30,
  },
  uploadSection: {
    marginTop: 15,
    flexDirection: 'row',
  },
  proPic: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'black',
  },
  ownerName: {
    marginTop: 2,
    color: 'black',
  },
  inputArea: {
    height: 200,
    marginTop: 5,
    backgroundColor: '',
    borderColor: '#dfe6e9',
    borderBottomWidth: 2.5,
    padding: 5,
  },
  addSomBtn: {
    marginTop: 10,
    marginLeft: 0,
    fontSize: 16,
    width: 400,
  },
  witetxt: {
    color: 'black',
    fontSize: 16,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogo: {
    width: 45,
    height: 20,
  },
  tempUploadImg: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginLeft: 10,
    display: 'flex',
  },
});
