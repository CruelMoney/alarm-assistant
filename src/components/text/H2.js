import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';

export default class H2 extends Component {
  render() {
    return (
        <Text
        style={StyleSheet.flatten([{
          fontSize: 18,
          marginBottom: 5,
          fontFamily: "AvenirNext-DemiBold",
          textAlign: "center",
          color: "#fff",
          
        }, this.props.style])}
        > {this.props.children} </Text>
    );
  }
}
