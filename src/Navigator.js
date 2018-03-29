import React, { Component } from 'react';
import { View, Text, StyleSheet, Image  } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import NavigationService from './services/NavigationService';
import Home from './routes/home';
import Onboarding from './routes/onboarding';


const Navigator = StackNavigator({
  "Onboarding": { screen: Onboarding },
  "Home": { screen: Home }
},
{
  initialRouteName: 'Home',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});


class Index extends Component {
  render() {
    return (
    <Navigator 
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
    );
  }
}

export default Index;
