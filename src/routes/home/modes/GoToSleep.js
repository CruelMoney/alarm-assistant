import React, { Component } from 'react';
import {  View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import MyButton from '../Button';
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
    const { navigate } = this.props.navigation;
    const textOpacity = this._deltaY.interpolate({
      inputRange: [Screen.height-315, Screen.height-115],
      outputRange: [0.33, 1]
    });

    return (
      <View style={styles.containerColor} >
      <Animated.Text 
      style={
        StyleSheet.flatten([
          styles.text,{
          opacity: textOpacity
        }])}>
          Go to sleep now to get a full <Text style={styles.highlight}>7.5</Text> hours of sleep. Your first event is scheduled at <Text style={styles.highlight}>10:00</Text> tomorrow,  and I will wake you up at <Text style={styles.highlight}>8:00</Text>, with “Morning playlist”.
      </Animated.Text>
       
        <Menu
          animatedValueY={this._deltaY}
          animatedNativeDriver={true}
        >
          <MyButton 
          label={"SLEEP"} 
          style={{backgroundColor: '#F29160'}} />
          <MyButton 
          onPress={() => navigate('Nap')}
          label={"NAP"} 
          style={{backgroundColor: '#A782D4'}} />
          <MyButton 
          onPress={() => navigate('Settings')}
          label={"SETTINGS"} 
          style={{backgroundColor: '#8EC5F2'}} />
        </Menu>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  containerColor:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9966',
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
  }
 
});