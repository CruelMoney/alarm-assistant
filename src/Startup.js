import React, { Component } from 'react';
import { View, Text,  } from 'react-native';
import { Font } from 'expo';
import Splash from './routes/splash';

let delay = (time) => new Promise(resolve => setTimeout(() => resolve(), time));

class Startup extends Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {     
    await Promise.all([
      delay(2000), // show splash in minimum 500ms
      Font.loadAsync({
      'avenir-next-bold': require('./assets/fonts/AvenirNext-Bold-01.ttf'),
      'avenir-next-heavy': require('./assets/fonts/AvenirNext-Heavy-09.ttf'),
      'avenir-next-demi': require('./assets/fonts/AvenirNext-DemiBold-03.ttf'),
      'avenir-next-medium': require('./assets/fonts/AvenirNext-Medium-06.ttf'),
      })
    ])

    this.setState({ fontLoaded: true });
  }

  render() {
    const { fontLoaded } = this.state;

    return (
     fontLoaded ? this.props.children : <Splash/>
    );
  }
}

export default Startup;
