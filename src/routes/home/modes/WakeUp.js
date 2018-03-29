import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import MyButton from '../Button';
import Menu from '../Menu';


export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }


  openDrawer = () => {
    console.log("opening")
    this._drawer.open()
  };


  render() {
    return (
      <View style={styles.containerColor} >
        <Text style={styles.text}>
          Nap now now to get a full <Text style={styles.highlight}>7.5</Text> hours of sleep. Your first event is scheduled at <Text style={styles.highlight}>10:00</Text> tomorrow,  and I will wake you up at <Text style={styles.highlight}>8:00</Text>, with “Morning playlist”.
        </Text>
        <Menu>
          <MyButton label={"NAP"} style={{backgroundColor: '#A782D4'}} />
          <MyButton label={"SLEEP"} style={{backgroundColor: '#F29160'}} />
          <MyButton label={"SETTINGS"} style={{backgroundColor: '#8EC5F2'}} />
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
    backgroundColor: '#B18AE0',
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
    color: '#87DCFA',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
  }
 
});