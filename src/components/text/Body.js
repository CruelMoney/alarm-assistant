import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Body extends Component {
  render() {
    const {dark} = this.props;
    return (
        <Text
        style={StyleSheet.flatten([{
          fontSize: 14,
          color: dark ? "#9B9B9B" : "#fff",
          textAlign: "center",
          fontFamily: 'AvenirNext-Medium',
        }, this.props.style])}>
          {this.props.children}
        </Text>
    );
  }
}

export default Body;
