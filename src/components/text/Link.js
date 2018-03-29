import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Link extends Component {
  render() {
    return (
        <Text style={StyleSheet.flatten([{
          fontSize: 16,
          textAlign: "center",
          fontFamily: 'AvenirNext-DemiBold',
          color: "#fff",
          letterSpacing: 1.5
        }, this.props.style])}>
          {this.props.children}
        </Text>
    );
  }
}

export default Link;
