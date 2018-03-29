import React, { Component } from 'react';
import { View, Text,  } from 'react-native';
import Splash from './routes/splash';

let delay = (time) => new Promise(resolve => setTimeout(() => resolve(), time));

class Startup extends Component {
  state = {
    loaded: false,
  };

  async componentDidMount() {     
    await Promise.all([
      delay(2000), // show splash in minimum 2000ms
    ])

    this.setState({ loaded: true });
  }

  render() {
    const { loaded } = this.state;

    return (
     loaded ? this.props.children : <Splash/>
    );
  }
}

export default Startup;
