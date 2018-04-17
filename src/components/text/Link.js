import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Link extends Component {
  render() {
    const {dark} = this.props;

    return (
        <Text style={StyleSheet.flatten([{
          fontSize: 16,
          textAlign: "center",
          fontFamily: 'AvenirNext-DemiBold',
          color: dark ? "#9B9B9B" : "#fff",
          letterSpacing: 1.5
        }, this.props.style])}>
          {this.props.children}
        </Text>
    );
  }
}

export default Link;
