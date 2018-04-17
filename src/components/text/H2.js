import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';

export default class H2 extends Component {
  render() {
    const {dark} = this.props;

    return (
        <Text
        style={StyleSheet.flatten([{
          fontSize: 18,
          marginBottom: 5,
          fontFamily: "AvenirNext-DemiBold",
          textAlign: "center",
          color: dark ? "#9B9B9B" : "#fff",
          
        }, this.props.style])}
        > {this.props.children} </Text>
    );
  }
}
