import React, { Component } from 'react';
import { View, } from 'react-native';
import Onboarding from './routes/onboarding';
import Startup  from "./Startup";

class Index extends Component {
  render() {
    return (
      <Startup>
        <Onboarding />
      </Startup>
    );
  }
}

export default Index;
