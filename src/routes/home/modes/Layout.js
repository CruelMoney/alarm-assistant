import React, { Component } from 'react';
import {  View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import Menu from '../Menu';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this._deltaY = new Animated.Value(Screen.height-115);

  }

  render() {
    const { containerStyle } = this.props;
    const textOpacity = this._deltaY.interpolate({
      inputRange: [Screen.height-315, Screen.height-115],
      outputRange: [0.33, 1]
    });

    return (
      <View 
        style={StyleSheet.flatten([styles.container, containerStyle])} >
      <Animated.Text 
      style={
        StyleSheet.flatten([
          styles.text,{
          opacity: textOpacity
        }])}>
          {this.props.children}
      </Animated.Text>
       
        <Menu
          animatedValueY={this._deltaY}
        >
          {this.props.menu}
        </Menu>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30 
  },
  text:{
    textAlign: "left",
    fontFamily: 'AvenirNext-Heavy',
    fontSize: 34,
    color: '#fff',
    lineHeight: 44
  },
  highlight: {
    color: '#FFCC4C',
  },

 
});