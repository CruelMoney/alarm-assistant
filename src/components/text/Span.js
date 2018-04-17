import React, { Component } from 'react';
import { View, Text,  } from 'react-native';

class Span extends Component {
  render() {
    const {dark} = this.props;

    return (
        <Text style={{
          fontSize: 12,
          textAlign: "center",
          fontFamily: 'AvenirNext-Medium',
          color: dark ? "#9B9B9B" : "#fff",
          ...this.props.style
        }}>
          {this.props.children}
        </Text>
    );
  }
}

export default Span;
