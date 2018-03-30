import React, { Component } from 'react';
import { View, Text, StyleSheet, Image  } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import NavigationService from './services/NavigationService';
import Home from './routes/home';
import Settings from './routes/settings';
import Onboarding from './routes/onboarding';
import connectSettings from './containers/settings';

const getNavigator = (initRoute) => StackNavigator({
  "Onboarding": { screen: Onboarding },
  "Home": { screen: Home, navigationOptions: {gesturesEnabled:false} },
  "Settings": { screen: Settings }
},
{
  initialRouteName: initRoute,
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
    gesturesEnabled: true
  }
});

const OnBoardNavigator = getNavigator("Onboarding");
const HomeNavigator = getNavigator("Home");

class Index extends Component {
  render() {
    const { onboarded } = this.props;

    if(onboarded){
      return (
        <HomeNavigator 
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      );
    }else{
      return (
        <OnBoardNavigator 
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      );
    }
  }
}

export default connectSettings(Index);
