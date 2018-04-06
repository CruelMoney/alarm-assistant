import React, { Component } from 'react';
import {  View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import Menu from '../Menu';
import MyButton from '../Button';
import DynamicBG from '../../../components/DynamicBG';
import {getTimeColor} from '../../../utils/colors';
import Color from 'color';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

class index extends Component {
  constructor(props) {
    super(props);
    this.menuDrag = new Animated.Value(Screen.height-115);
    this.animationValues = [
      new Animated.Value(1),
      new Animated.Value(0),
      new Animated.Value(0)
    ];
    props.registerAnimate && props.registerAnimate(this.animate);
  }

  animate = (reverse) => {
    let animations = this.animationValues.map(v => {
      const startValue = v._value
      const endValue = 1 - startValue;
      return Animated.timing(v, { toValue: endValue, duration: 500 }) 
    });
    animations = reverse ? animations.reverse() : animations;
    this.closeMenu();
    Animated.stagger(250, animations).start()
  }

  render() {
    const { display } = this.props;
    const textOpacity = this.menuDrag.interpolate({
        inputRange: [Screen.height-315, Screen.height-115],
        outputRange: [0.33, 1]
      });
    const offsetY = this.animationValues[0].interpolate({
      inputRange: [0,1],
      outputRange: [50, 0]
    });
    const color = Color(getTimeColor());

    return (
      <DynamicBG 
        skyProgress={this.animationValues[1]}
        style={styles.container}
      >
      <Animated.View  
        style={StyleSheet.flatten([
            {
            opacity: this.animationValues[0],
            transform: [{translateY: offsetY}]
          }])}>
        <Animated.Text 
        style={
          StyleSheet.flatten([
            styles.text,{
            opacity: textOpacity,
    
          }])}>
            {display}
        </Animated.Text>
      </Animated.View>
        
      <Animated.View  
        style={StyleSheet.flatten([
            {
            position: 'absolute',
            bottom: 100,
            opacity: this.animationValues[2],
          }])}>
        {this.props.activeText}
      </Animated.View>

        <Menu
          registerCloseFun={fun => this.closeMenu = fun}
          animatedValueY={this.menuDrag}
        >
          {this.props.menu}
        </Menu>
      </DynamicBG>
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

export default (index);