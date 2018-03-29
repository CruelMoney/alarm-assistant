import React, { Component } from 'react';
import {  View, Text, StyleSheet, Button, Dimensions, Platform, Animated } from 'react-native';
import Interactable from 'react-native-interactable';


const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}



const styles = StyleSheet.create({
 
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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

class Menu extends Component {
  render() {
    return (
      <View style={styles.panelContainer}>
      <Interactable.View
        {...this.props}
        verticalOnly={true}
        snapPoints={[{y: Screen.height-315, tension: 400, damping: 0.7}, {y: Screen.height-115}]}
        initialPosition={{y: Screen.height-115}}
        boundaries={{top: Screen.height-315, bottom: Screen.height-115, haptics: true, bounce: 0.5}}>
        <View style={styles.panel}>
          <View style={styles.panelHandle} />
          {this.props.children}
         </View>
      </Interactable.View>
    </View>
    );
  }
}

export default Menu;
