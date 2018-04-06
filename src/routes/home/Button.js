import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight  } from 'react-native';

const styles = StyleSheet.create({
  button:{
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    fontSize: 34,
    color: "#fff",
    letterSpacing: 1.8,
    fontFamily: 'AvenirNext-DemiBold'
  }
}) 
class Button extends Component {
  render() {
    const {label, style, ...props} = this.props;

    return (
     
      <TouchableHighlight
      {...props}
      style={StyleSheet.flatten([styles.button, style])}
      >
        <Text style={styles.text}>{label}</Text>
      </TouchableHighlight>
      
    );
  }
}

export default Button;
