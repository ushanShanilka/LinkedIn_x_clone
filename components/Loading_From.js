import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Loading_From extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // setTimeout(function () {
    //   this.getData();
    // }, 2000);
    this.getData();
  }

  getData = async () => {
    try {
      const displayName = await AsyncStorage.getItem('displayName');
      if (displayName != null) {
        this.props.navigation.navigate('MainHome');
      } else {
        this.props.navigation.navigate('Signin');
        console.log();
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.frame}>
        <ImageBackground
          source={require('../assets/img/loading.jpg')}
          style={styles.image}></ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  frame: {
    alignItems: 'center',
  },
  image: {
    width: 380,
    height: 720,
    resizeMode: 'cover',
  },
});
