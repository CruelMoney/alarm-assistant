import React, { Component } from 'react';
import { View, } from 'react-native';
import Startup  from "./Startup";
import Navigator from './Navigator';

class Index extends Component {
  render() {
    return (
      <Startup>
        <Navigator />
      </Startup>
    );
  }
}

export default Index;
