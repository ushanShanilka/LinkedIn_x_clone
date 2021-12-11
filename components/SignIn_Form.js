import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {Button, TextInput, IconButton, Colors} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

import messaging from '@react-native-firebase/messaging';

GoogleSignin.configure({
  webClientId:
    '706755727193-f3ec5r7hs37md7cf812rhbq1unag6vi2.apps.googleusercontent.com',
});

export default class SingIn_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      displayName: '',
    };
    auth().onAuthStateChanged(user => {
      if (user) {
        // console.log('User : ', user);
        this.setState({
          displayName: user.displayName,
        });
      }
    });
    this.getData();
  }

  getCruntUserDetails = async () => {
    try {
      const cruntUserDisplayName = await AsyncStorage.getItem(this.state.email);

      await AsyncStorage.setItem('displayName', cruntUserDisplayName);
      await AsyncStorage.setItem(
        'proPicUrl',
        'https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png',
      );
    } catch (error) {
      Alert(error);
    }
  };

  getData = async () => {
    try {
      const cruntUser = await AsyncStorage.getItem('displayName');
      if (cruntUser !== null) {
        this.props.navigation.navigate('MainHome');
      } else {
      }
    } catch (e) {
      Alert(e);
    }
  };

  storeData = async value => {
    try {
      await AsyncStorage.setItem('email', this.state.email);
      await AsyncStorage.setItem('password', this.state.password);
    } catch (e) {
      console.log('Data Saved Faild');
    }
  };

  signInWithEmailAndPassword = async () => {
    this.getCruntUserDetails();
    auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.storeData();
        this.props.navigation.navigate('MainHome');
      })
      .catch(error => {
        console.error(error);
        Alert(error);
      });
  };

  singInWithGoogle = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user = auth().signInWithCredential(googleCredential);

    if ((await user).user.displayName != null) {
      await AsyncStorage.setItem('displayName', (await user).user.displayName);
      await AsyncStorage.setItem('proPicUrl', (await user).user.photoURL);
      await AsyncStorage.setItem('email', (await user).user.email);
      this.props.navigation.navigate('MainHome');
    } else {
      console.log('Null');
    }
  };

  singInWithFaceBook = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      const fb = await auth().signInWithCredential(facebookCredential);
      // await AsyncStorage.setItem('displayName', fb.user.displayName);

      if (fb.user.displayName != null) {
        await AsyncStorage.setItem('displayName', fb.user.displayName);
        await AsyncStorage.setItem('proPicUrl', fb.user.photoURL);
        await AsyncStorage.setItem('email', fb.user.email);
        this.props.navigation.navigate('MainHome');
      } else {
        console.log('Null');
      }
    } catch (error) {
      console.log(error);
    }
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

  navigateSingUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.maincontainer1}>
              <Image
                source={require('../assets/img/linkedin-logo.png')}
                resizeMode="contain"
                style={styles.mainlogo}
              />
            </View>

            <View style={styles.maincontainer2}>
              <Text style={styles.joinNow} onPress={this.navigateSingUp}>
                Join Now
              </Text>
            </View>

            <Text style={styles.main}>Sign In</Text>

            <View style={styles.contaiiner}>
              <TextInput
                style={styles.input}
                label="Email"
                activeUnderlineColor="gray"
                value={this.state.email}
                onChangeText={text => this.setState({email: text})}
              />

              <TextInput
                label="password"
                right={<TextInput.Icon color="gray" name="eye" />}
                style={styles.input}
                activeUnderlineColor="gray"
                value={this.state.password}
                secureTextEntry
                onChangeText={text => this.setState({password: text})}
              />

              <Button
                style={styles.btn}
                mode="contained"
                onPress={this.signInWithEmailAndPassword}>
                Continue
              </Button>

              <Text style={{marginBottom: 20}}>Forget password ?</Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.hrtag} />
                <View>
                  <Text
                    style={{width: 50, textAlign: 'center', marginBottom: 20}}>
                    Or
                  </Text>
                </View>
                <View style={styles.hrtag} />
              </View>

              {/* <GoogleSigninButton
                style={styles.googlebtn}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={this.singInWithGoogle}
              /> */}

              <Button
                uppercase={false}
                style={styles.socialeBtn}
                mode="contained"
                onPress={this.singInWithGoogle}>
                <Text style={styles.witetxt}>
                  <Image
                    source={require('../assets/icon/google.png')}
                    resizeMode="contain"
                    style={styles.socialLogo}
                  />
                  Sign In With Google
                </Text>
              </Button>

              <Button
                uppercase={false}
                style={styles.socialeBtn}
                mode="contained"
                onPress={this.singInWithFaceBook}>
                <Text style={styles.witetxt}>
                  <Image
                    source={require('../assets/icon/facebook.png')}
                    resizeMode="contain"
                    style={styles.socialLogo}
                  />
                  Sign In With FaceBook
                </Text>
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  maincontainer1: {
    alignItems: 'flex-start',
  },
  maincontainer2: {
    alignItems: 'flex-end',
    marginTop: -40,
    marginRight: 20,
  },
  main: {
    marginTop: 30,
    fontSize: 30,
    marginBottom: 20,
    color: 'black',
    marginLeft: 22,
  },
  mainlogo: {
    width: 100,
    height: 50,
    marginTop: 20,
    marginLeft: 22,
  },
  joinNow: {
    alignItems: 'flex-end',
    fontWeight: 'bold',
    color: '#1569C7',
  },
  btn: {
    marginTop: 20,
    backgroundColor: '#1569C7',
    width: 360,
    borderRadius: 18,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    fontSize: 16,
  },
  contaiiner: {
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  input: {
    width: 360,
    height: 55,
    marginTop: 15,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  hrtag: {
    flex: 1,
    height: 1,
    backgroundColor: '#b2bec3',
    marginBottom: 20,
  },
  socialeBtn: {
    width: 360,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  witetxt: {
    color: 'black',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialLogo: {
    width: 40,
    height: 20,
    justifyContent: 'flex-end',
  },
});
