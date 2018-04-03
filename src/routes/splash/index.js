import React, { Component } from 'react';
import {  View, Text, StatusBar, Image } from 'react-native';
import DynamicBG from '../../components/DynamicBG';
import logo from '../../assets/images/Logo.png';

export default class Splash extends Component {
  render() {
    return (
   
      <DynamicBG>
        <View>
        <Image
          source={logo}
        />
        <Text
          style={{
            letterSpacing: 5,
            fontSize: 46,
            color: '#fff',
            textAlign: "center",
            fontWeight: "bold",
            marginTop: 83
          }}>
          SUNRISE
        </Text>
        </View>
      </DynamicBG>
    );
  }
}
