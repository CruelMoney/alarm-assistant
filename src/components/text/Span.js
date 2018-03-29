import React, { Component } from 'react';
import { View, Text,  } from 'react-native';

class Span extends Component {
  render() {
    return (
        <Text style={{
          fontSize: 12,
          textAlign: "center",
          //fontFamily: 'avenir-next-medium',
          color: "#fff",
          ...this.props.style
        }}>
          {this.props.children}
        </Text>
    );
  }
}

export default Span;
