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
import {TextInput, Button, Avatar} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Jobs_form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getUserDetail();
  }

  getUserDetail = async () => {
    const proPicUrl = await AsyncStorage.getItem('proPicUrl');
    this.setState({
      proPic: proPicUrl,
    });
  };

  userLogOut = async () => {
    await AsyncStorage.removeItem('proPicUrl');
    await AsyncStorage.removeItem('displayName');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('password');
    this.props.navigation.navigate('Signin');
    Alert.alert('Log Out!');
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

              <Button icon="loading" mode="contained" onPress={this.userLogOut}>
                Log Out
              </Button>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
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
    flex: 0.4,
    alignItems: 'center',
    flexDirection: 'row',
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
    textAlign: 'center',
    marginRight: 10,
    backgroundColor: 'white',
  },
  message: {
    width: 40,
  },
});
