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
  constructor(props) {
    super(props);
    this.state = {
      sleeping: false
    };
    this.animateFunc = null;
    this.updateNapLength = null;
  }

  componentWillReceiveProps(nextprops){
    !!nextprops.napMoment && 
    !this.updateNapLength && 
    this.countDownNapLength(nextprops.napMoment);
  }

  componentWillUnmount(){
    this.updateNapLength && clearInterval(this.updateNapLength);
  }

  toggleNap = _.throttle(() => {
    const {sleeping} = this.state;
    this.animateFunc(sleeping);
    sleeping ? this.stopNap() : this.startNap();
  }, 1000, { 'trailing': false })

  countDownNapLength = (endMoment) => {
    const updateFun = () => {
      const { napMoment } = this.props;
      endMoment = !!napMoment ? napMoment : endMoment;
      const napLength = Math.round(endMoment.diff(moment(), 'seconds')/60, 1);
      this.setState({
        napLength: napLength
      })
    }
    updateFun();
    this.updateNapLength = setInterval(updateFun, 1000);
  }

  startNap = () => {
    const { startNap } = this.props;
    startNap();
    this.setState({
      sleeping: true
    });
  }

  stopNap = () => {
    const { updateAlarmData, stopNap } = this.props;
    stopNap();
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

  render() {
    const { napMoment } = this.props;
    const { napLength }  = this.state;
    
    return (
      <Layout
      registerAnimate={fun => this.animateFunc = fun}
      display={getNapText({...this.props})}
      menu={this.getMenu()}
      activeText={
        <View>
        <Body>
          Nap finished in
        </Body> 
          <Text 
            style={{
            fontSize: 46, 
            fontFamily: "AvenirNext-Bold",
            textAlign: 'center',
            color: '#fff'
            }}>
            {napLength}
            </Text>
        <Body>
          minutes
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