import React, { Component } from 'react';
import { View, Text, StyleSheet, Image  } from 'react-native';
import GradientBG from '../../components/GradientBG';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Footer from './Footer';
import {
  TabNavigator,
} from 'react-navigation';
import NavigationService from '../../services/NavigationService';
import logo from '../../assets/images/Logo.png';


const Steps = TabNavigator({
  "1": { screen: Step1 },
  "2": { screen: Step2 },
  "3": { screen: Step3 },
  "4": { screen: Step4 }
},
{
  initialRouteName: '4',
  animationEnabled: true,
  swipeEnabled: true,
  lazy: false,
  navigationOptions:{
    tabBarVisible: false,
    onNavigatorEvent: console.log

  },

});


class Index extends Component {
  state={
    activeStep:1
  }

  render() {
    const {activeStep} = this.state;

    return (
      <GradientBG>
          <View style={{flex: 1,justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
            <Steps 
            onNavigationStateChange={(_,currentState) => {this.setState({activeStep: currentState.index+1})}}
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
            />
          </View>
          <Footer activeStep={activeStep} />
      </GradientBG>
    );
  }
}


const styles = StyleSheet.create({
  section:{
    marginLeft: 10,
    marginRight: 10
  },
  timepickers:{
    flexDirection: 'row',
    justifyContent: "space-around"
  }
});

export default Index;
