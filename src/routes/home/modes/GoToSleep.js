import React, { Component } from 'react';
import {  View, Text, StyleSheet, Button, Dimensions, Platform } from 'react-native';
import Interactable from 'react-native-interactable';
import MyButton from '../Button';


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
  }


  openDrawer = () => {
    console.log("opening")
    this._drawer.open()
  };


  render() {
    return (
      <View style={styles.containerColor} >
        <Text style={styles.text}>
          Go to sleep now to get a full <Text style={styles.highlight}>7.5</Text> hours of sleep. Your first event is scheduled at <Text style={styles.highlight}>10:00</Text> tomorrow,  and I will wake you up at <Text style={styles.highlight}>8:00</Text>, with “Morning playlist”.
        </Text>
        <View style={styles.panelContainer}>
          <Interactable.View
            verticalOnly={true}
            snapPoints={[{y: Screen.height-315, tension: 400, damping: 0.7}, {y: Screen.height-115}]}
            initialPosition={{y: Screen.height-115}}
            boundaries={{top: Screen.height-315, bottom: Screen.height-115, haptics: true, bounce: 0.5}}>
            <View style={styles.panel}>
              <View style={styles.panelHandle} />
              <MyButton label={"SLEEP"} style={{backgroundColor: '#F29160'}} />
              <MyButton label={"NAP"} style={{backgroundColor: '#A782D4'}} />
              <MyButton label={"SETTINGS"} style={{backgroundColor: '#8EC5F2'}} />
            </View>
          </Interactable.View>
        </View>
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
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  panel: {
    height: 325,
    flexDirection: 'column',
    alignItems: "center"
  },
  panelHandle: {
    width: 70,
    height: 6,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: '#ffffff80'
  }
 
});