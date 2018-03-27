import React, { Component } from 'react';
import {  View, Text, StatusBar, Image } from 'react-native';
import GradientBG from '../../components/GradientBG';
import logo from '../../assets/images/Logo.png';

export default class Splash extends Component {
  render() {
    return (
   
      <GradientBG>
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
      </GradientBG>
    );
  }
}
