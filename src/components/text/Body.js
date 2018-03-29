import React, { Component } from 'react';
import { View, Text,  } from 'react-native';

class Body extends Component {
  render() {
    return (
        <Text style={{
          fontSize: 14,
          color: "#fff",
          textAlign: "center",
         // fontFamily: 'avenir-next-medium',
          ...this.props.style
        }}>
          {this.props.children}
        </Text>
    );
  }
}

export default Body;
