import React, {Component} from 'react';
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
import {Button, TextInput} from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  webClientId:
    '706755727193-f3ec5r7hs37md7cf812rhbq1unag6vi2.apps.googleusercontent.com',
});

export default class SingUp_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
      proPicUrl: '',
    };
    auth().onAuthStateChanged(user => {
      if (user) {
        // console.log('User Display Name : ', user.displayName);
      }
    });
  }

  storeDataUsingEmailAndPassword = async value => {
    try {
      await AsyncStorage.setItem(this.state.email, this.state.userName);
    } catch (e) {
      console.log('Data Saved Faild');
    }
  };

  singUpWithEmailAndPassword = () => {
    this.setState({
      proPicUrl:
        'https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png',
    });
    this.storeDataUsingEmailAndPassword();
    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(createdUser => {
        this.saveUsers();
        console.log('User account created & signed in!');
        Alert.alert('Success');

        this.props.navigation.navigate('Signin');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }

        console.error(error);
      });
  };

  singInWithGoogle = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user = auth().signInWithCredential(googleCredential);
    this.setState({
      userName: (await user).user.displayName,
      email: (await user).user.email,
      proPicUrl: (await user).user.photoURL,
    });

    console.log((await user).user.email);

    if ((await user).user.displayName != null) {
      await AsyncStorage.setItem('displayName', (await user).user.displayName);
      await AsyncStorage.setItem('proPicUrl', (await user).user.photoURL);
      await AsyncStorage.setItem('email', (await user).user.email);
      this.props.navigation.navigate('MainHome');
    } else {
      console.log('Null');
    }
    this.saveUsers();
  };

  saveUsers = () => {
    // firestore()
    //   .collection('users')
    //   .add({
    //     name: this.state.userName,
    //     proPicUrl: this.state.proPicUrl,
    //     email: this.state.email,
    //   })
    //   .then(user => {
    //     console.log(user);
    //     console.log('User Saved!');
    //   });

    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot);

        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.data().email);

          if (documentSnapshot.data().email != this.state.email) {
            firestore()
              .collection('users')
              .add({
                name: this.state.userName,
                proPicUrl: this.state.proPicUrl,
                email: this.state.email,
              })
              .then(user => {
                console.log('User Saved!');
              });
          } else {
            console.log('Already-in-use');
          }
        });
      });
  };

  navigateSignIn = () => {
    this.props.navigation.navigate('Signin');
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.maincontainer}>
              <Image
                source={require('../assets/img/linkedin-logo.png')}
                resizeMode="contain"
                style={styles.mainlogo}
              />
            </View>
            <Text style={styles.main}>Join LinkedIn</Text>
            <View style={styles.orSiginIn}>
              <Text>Or</Text>
              <Text onPress={this.navigateSignIn} style={styles.txtSignIn}>
                Sign In
              </Text>
            </View>
            <View style={styles.contaiiner}>
              <TextInput
                style={styles.input}
                label="User Name"
                activeUnderlineColor="gray"
                value={this.state.userName}
                onChangeText={text => this.setState({userName: text})}
              />
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
                secureTextEntry
                activeUnderlineColor="gray"
                style={styles.input}
                value={this.state.password}
                onChangeText={text => this.setState({password: text})}
              />
              <Button
                style={styles.btn}
                mode="contained"
                onPress={this.singUpWithEmailAndPassword}>
                Continue
              </Button>

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
                  Sing In With Google
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
  maincontainer: {
    alignItems: 'flex-start',
  },
  main: {
    marginTop: 30,
    fontSize: 30,
    marginBottom: 20,
    color: 'black',
    marginLeft: 22,
  },
  orSiginIn: {
    marginLeft: 22,
    flexDirection: 'row',
  },
  txtSignIn: {
    marginLeft: 10,
    color: '#1569C7',
  },
  mainlogo: {
    width: 100,
    height: 50,
    marginTop: 20,
    marginLeft: 22,
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
    marginLeft: 30,
    marginRight: 30,
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
