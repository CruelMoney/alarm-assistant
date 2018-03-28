import React, { Component } from 'react';
import {  View, Text, StatusBar } from 'react-native';
import GoToSleep from './modes/GoToSleep';

export default class componentName extends Component {
  render() {
    return (
      <View style={{flex:1}}>
       <StatusBar
          barStyle="light-content"
        />
        <GoToSleep/>
      </View>
    );
  }
}
