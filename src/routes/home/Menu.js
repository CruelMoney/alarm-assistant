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
  },
  hide:{
    opacity: 0
  }
 
});

class Menu extends Component {
  constructor(props){
    super(props);

    !!props.registerCloseFun && props.registerCloseFun(this.close)
  }

  close = () => {
    this.interactable.snapTo({index: 1});
  }
  
  render() {
    const childrenCount = this.props.children.props.children.length;
    const count = 3;
    const buttonHeight = 100
    const closedPosition = Screen.height-(buttonHeight+15);
    const openedPosition = Screen.height-(count*buttonHeight+15);
    const dragEnabled = childrenCount > 1;

    return (
      <View style={styles.panelContainer}>
      <Interactable.View
        {...this.props}
        ref={r => this.interactable = r}
        animatedNativeDriver={true}
        verticalOnly={true}
        dragEnabled={dragEnabled}
        snapPoints={[{y: openedPosition, tension: 400, damping: 0.7}, {y: closedPosition}]}
        initialPosition={{y: closedPosition}}
        boundaries={{top: openedPosition, bottom: closedPosition, haptics: true, bounce: 0.5}}>
        <View style={styles.panel}>
          <View style={StyleSheet.flatten([
            styles.panelHandle,
            dragEnabled ? {} : styles.hide
            ])} />
          {this.props.children}
         </View>
      </Interactable.View>
    </View>
    );
  }
}

export default Menu;
