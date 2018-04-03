import React, { Component } from 'react';
import {StatusBar, View, StyleSheet, Image} from 'react-native'; 
import sky from '../assets/images/sky.png';
import nightsky from '../assets/images/nightsky.png';
import moment from 'moment';
import {getTimeColor} from '../utils/colors';

export default class GradientBG extends Component {
  render() {
    const { style, sky } = this.props;
    const timeColor = getTimeColor(true);
    const now = moment();
    const skybg = now.hour() > 20 ? nightsky : sky;

    console.log(timeColor);
    return (
      <View style={StyleSheet.flatten([
        styles.container, 
        style, 
        {
          backgroundColor: timeColor
        }])}>
       <StatusBar
          barStyle="light-content"
        />
          {sky ? <Image source={skybg} style={styles.sky} /> : null}
          {this.props.children}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  sky:{
    position: 'absolute',
    top: 0
  }
})