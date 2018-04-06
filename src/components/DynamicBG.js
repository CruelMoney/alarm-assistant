import React, { Component } from 'react';
import {StatusBar, View, StyleSheet, Image, Animated} from 'react-native'; 
import daysky from '../assets/images/sky.png';
import nightsky from '../assets/images/nightsky.png';
import moment from 'moment';
import {getTimeColor} from '../utils/colors';

export default class GradientBG extends Component {

  constructor(props) {
    super(props);
  
  }

  render() {
    const { style, skyProgress } = this.props;
    const timeColor = getTimeColor(true);
    const now = moment();
    const skybg = (now.hour() > 18 || now.hour() < 8) ? nightsky : daysky;
    


    return (
      <View style={StyleSheet.flatten([
        styles.container, 
        style, 
        { backgroundColor: timeColor }
      ])}>
       <StatusBar
          barStyle="light-content"
        />
          <Animated.Image source={skybg} 
           style={
            StyleSheet.flatten([
              styles.sky,{
              opacity: skyProgress,
              // transform: [{translateY: animatedOffsetY}]
            }])}
          
          />
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