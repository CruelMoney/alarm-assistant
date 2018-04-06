import React, { Component } from 'react';
import {  View, Text, StatusBar } from 'react-native';
import GoToSleep from './modes/GoToSleep';
import Sleeping from './modes/Sleeping';
import Nap from './modes/Nap';
import WakeUp from './modes/WakeUp';
import { StackNavigator } from 'react-navigation';
import moment from 'moment';

const currentHour = moment().hour();

const Navigator = StackNavigator({
  "GoToSleep": { screen: GoToSleep },
  "Nap": { screen: Nap },
  "Sleeping": {screen: Sleeping},
  "WakeUp": {screen: WakeUp}
},
{
  initialRouteName: (currentHour > 9 && currentHour < 18) ? 'Nap' : 'GoToSleep',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
    gesturesEnabled: false
  }
});

export default class componentName extends Component {
  render() {
    return (
      <View style={{flex:1}}>
      <StatusBar
          barStyle="light-content"
        />
       <Navigator/>
      </View>
    );
  }
}
