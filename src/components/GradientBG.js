import React, { Component } from 'react';
import {StatusBar, View} from 'react-native'; 

export default class GradientBG extends Component {
  render() {
    return (
      <View
      style={{ backgroundColor: "#FF9966", flex: 1, justifyContent: "center", alignItems: "center" }}>
       <StatusBar
          barStyle="light-content"
        />
        {this.props.children}
      </View>
    );
  }
}
