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
import moment from 'moment';

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
    sleeping ? this.stopSleep() : this.startSleep();
  }, 1000, { 'trailing': false })


  startSleep = () => {
    const { startSleep } = this.props;
    startSleep();
    this.setState({
      sleeping: true
    });
  }

  stopSleep = () => {
    const { updateAlarmData, stopSleep } = this.props;
    stopSleep();
    updateAlarmData();
    this.setState({
      sleeping: false
    });
  }

  getMenu = () => {
    const { sleeping } = this.state;
    const { navigate } = this.props.navigation;
    const color = Color(getTimeColor());
    if(sleeping){
      return ( 
        <View style={{width:'100%'}}>
          <MyButton 
            onPress={this.toggleSleep}
            label={"CANCEL"} 
            underlayColor={color.darken(0.15).string()}
            style={{backgroundColor: color.darken(0.1).string()}} />
        </View>
      )
    }else{
      return(
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
        )
    } 
  }

  render() {
    const { alarmMoment } = this.props;
    const { navigate } = this.props.navigation;
    const color = Color(getTimeColor());
    let hoursSleep = !!alarmMoment ? alarmMoment.diff(moment(), 'minute') : null;
    hoursSleep = Math.round(hoursSleep/60*100)/100;
    
    return (
      <Layout
      display={getSleepText({...this.props})}
      registerAnimate={fun => this.animateFunc = fun}
      menu={this.getMenu()}
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
            {
              !!alarmMoment ?
              `${alarmMoment.format('HH:mm')}`
              : null
            }
            </Text>
        <Body>
          in {hoursSleep} hours
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