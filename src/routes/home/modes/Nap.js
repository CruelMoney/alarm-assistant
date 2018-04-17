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
import moment from 'moment';
import {getNapText} from '../../../services/LanguageService';
import NavigationService from '../../../services/NavigationService';

class index extends Component {
  state={}

  constructor(props) {
    super(props);
    this.animateFunc = null;
    this.updateNapLength = null;
  }

  toggleNap = _.throttle(() => {
    const {sleeping} = this.props;
    this.animateFunc(sleeping);
    sleeping ? this.stopNap() : this.startNap();
  }, 1000, { 'trailing': false })

  countDownNapLength = (endMoment) => {
    const { napMoment } = this.props;
    const updateFun = () => {
      const napLength = Math.ceil(napMoment.diff(moment(), 'seconds'));
      this.setState({
        napTimeLeft: napLength
      })
    }
    updateFun();
    this.updateNapLength = setInterval(updateFun, 1000);
  }

  startNap = () => {
    const { startNap } = this.props;
    startNap();
    this.countDownNapLength();
  }

  stopNap = () => {
    const { updateAlarmData, stopNap } = this.props;
    this.updateNapLength && clearInterval(this.updateNapLength);
    stopNap();
    updateAlarmData();
  }

  wake = () => {
    const {wakeFromNap, updateAlarmData} = this.props;
    this.updateNapLength && clearInterval(this.updateNapLength);
    updateAlarmData();
    this.animateFunc(false);
    wakeFromNap();
  }

  getMenu = () => {
    const { navigation, waking, sleeping } = this.props; 
    const { navigate } = navigation;
    const color = Color(getTimeColor());
    if(!!waking){
      return(
        <View style={{width:'100%'}}>
          <MyButton 
            onPress={this.wake}
            label={"I'M AWAKE"} 
            underlayColor={color.darken(0.15).string()}
            style={{backgroundColor: color.darken(0.1).string()}} />
        </View>
      );
    }
    if(sleeping){
      return ( 
        <View style={{width:'100%'}}>
          <MyButton 
            onPress={this.toggleNap}
            label={"CANCEL"} 
            underlayColor={color.darken(0.15).string()}
            style={{backgroundColor: color.darken(0.1).string()}} />
        </View>
      )
    }else{
      return(
        <View style={{width:'100%'}}>
          <MyButton 
            onPress={this.toggleNap}
            label={"NAP"} 
            underlayColor={color.darken(0.15).string()}
            style={{backgroundColor: color.darken(0.1).string()}} />
          <MyButton 
            onPress={() => navigate('GoToSleep')}
            label={"SLEEP"} 
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

  getActiveText = () => {
    const {napTimeLeft} = this.state;
    const {waking, napLength, sleeping} = this.props;
    if(!waking && !sleeping) return null;
    return(
      <View>
        <Body>
          {!!waking ? "Napped for" : "Nap finished in"}
        </Body> 
          <Text 
            style={{
            fontSize: 46, 
            fontFamily: "AvenirNext-Bold",
            textAlign: 'center',
            color: '#fff'
            }}>
            {!!waking ? napLength : napTimeLeft}
            </Text>
        <Body>
          minutes
        </Body> 
      </View>
    );
  }

  render() {
    const { napMoment, napLength } = this.props;
    
    return (
      <Layout
      registerAnimate={fun => this.animateFunc = fun}
      display={getNapText({...this.props})}
      menu={this.getMenu()}
      activeText={this.getActiveText()}
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