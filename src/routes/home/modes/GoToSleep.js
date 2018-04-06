import React, { Component } from 'react';
import {  View, Text, StyleSheet, Animated } from 'react-native';
import Layout from './Layout';
import MyButton from '../Button';
import * as SoundService from '../../../services/SoundService';
import {getTimeColor} from '../../../utils/colors';
import Color from 'color';
import _ from 'lodash';
import Body from '../../../components/text/Body';
import connectAlarm from "../../../containers/alarm";
import { getSleepText } from '../../../services/LanguageService';
import NavigationService from '../../../services/NavigationService';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sleeping: false
    };
    this.animateFunc = null
  }

  toggleSleep = _.throttle(() => {
    const {sleeping} = this.state;
    this.animateFunc(sleeping);
    this.setState({
      sleeping: !sleeping
    });
  }, 750, { 'trailing': false })

  render() {
    const { navigate } = this.props.navigation;
    const color = Color(getTimeColor());
    
    return (
      <Layout
      display={getSleepText({...this.props})}
      registerAnimate={fun => this.animateFunc = fun}
      menu={
          <View style={{width:'100%'}}>
            <MyButton 
              onPress={this.toggleSleep}
              label={"SLEEP"} 
              underlayColor={color.darken(0.15).string()}
              style={{backgroundColor: color.darken(0.1).string()}} />
              <MyButton 
              onPress={() => navigate('Nap')}
              label={"NAP"} 
              underlayColor={color.darken(0.25).string()}
              style={{backgroundColor: color.darken(0.2).string()}} />
               <MyButton 
              onPress={() => NavigationService.navigate('Settings')}
              label={"SETTINGS"} 
              underlayColor={color.darken(0.35).string()}
              style={{backgroundColor:  color.darken(0.3).toString()}} />
          </View>
        }
      activeText={
        <View>
        <Body>
          Wake up at
        </Body> 
          <Text 
            style={{
            fontSize: 46, 
            fontFamily: "AvenirNext-Bold",
            textAlign: 'center',
            color: '#fff'
            }}>
            08:00
            </Text>
        <Body>
          7.5 hours
        </Body> 
        </View>
      }
      />
    );

  }
}

const styles = StyleSheet.create({
  highlight: {
    color: '#FFCC4C',
  },
  text:{
    color: 'white'
  }
});

export default connectAlarm(index);