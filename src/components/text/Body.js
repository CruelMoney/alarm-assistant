import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Body extends Component {
  render() {
    return (
        <Text
        style={StyleSheet.flatten([{
          fontSize: 14,
          color: "#fff",
          textAlign: "center",
          fontFamily: 'AvenirNext-Medium',
        }, this.props.style])}>
          {this.props.children}
        </Text>
    );
  }
}

export default Body;
