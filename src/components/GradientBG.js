import React, { Component } from 'react';
import {StatusBar} from 'react-native'; 
import { LinearGradient } from 'expo';

export default class GradientBG extends Component {
  render() {
    return (
      <LinearGradient
      colors={['#FFBE57', '#FF8040']}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
       <StatusBar
          barStyle="light-content"
        />
        {this.props.children}
      </LinearGradient>
    );
  }
}
