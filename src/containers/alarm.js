import        { connect          } from 'react-redux' ;
import React, { Component        } from 'react'       ;
import        { View     , Text, } from 'react-native';
import moment from 'moment';
import * as cs from '../services/CalendarService';
import * as as from '../services/AlarmService';
import * as ts from '../services/TransitService';
import * as ss from '../services/SoundService';
import DeviceBrightness from 'react-native-device-brightness';

const _getAlarmStateSlice = (state) => {
  const weekday = moment().isoWeekday();
  const isWeekend = weekday === 5 || weekday === 6;

  return {
    latestWakeupH  : isWeekend ? state.latestWeekends.h     : state.latestWeekdays.h,
    latestWakeupM  : isWeekend ? state.latestWeekends.m     : state.latestWeekdays.m,
    minSleepMinutes: isWeekend ? state.sleepLengthWeekends  : state.sleepLengthWeekdays
  }
}

const connectServices = (Wrapee) => {
  class Wrapper extends Component {
    state = { }

    getAlarmData = async () => {
      this.setState({
        loading: true
      });

      const {
        calendar, 
        calendars, 
        transit, 
        transportationMethod,
        preparationTime,
        napLength
      } = this.props;

      let alarmTime = false;
      let event = false;

      // fetch calendar if enabled
      if(calendar){
        event = await cs.getNextEvent(calendars);
        if(!!event){
          alarmTime = moment(event.startDate).subtract(preparationTime, 'minute');
          this.setState({
            firstEvent: event
          });
        }
      }
      
      // fetch transit if enabled
      if(transit && event && event.location){
        const transitTime = await ts.getTransitTime({
          to: event.location, 
          method: transportationMethod
        });
        alarmTime.subtract(transitTime, 'milliseconds');
      }

      // calculate alarm time
      const {firstAlarm, mode} = as.calculateNextAlarmTime({
         alarmTime: alarmTime,
         ..._getAlarmStateSlice(this.props)
      });

      // calculate nap time
      const {napAlarm, napMode, maxNap} = as.calculateNapTime({
        alarmTime: alarmTime,
        napLength: napLength
     });

      // save all in state
      this.setState({
        alarmTime: firstAlarm,
        mode,
        napAlarm,
        napMode, 
        maxNap,
        event: event,
        loading: false
      });
    }

    async componentDidMount(){
      await this.getAlarmData();
    }

    dimScreen = async () => {
      let brightness = await DeviceBrightness.getBrightnessLevel();
      const bInt = setInterval(() => {
        brightness = brightness - 0.01;
        if(brightness < 0){
          DeviceBrightness.setBrightnessLevel(0);
          return clearInterval(bInt);
        }else{
          DeviceBrightness.setBrightnessLevel(brightness);
        }
      }, 30);
    }

    startNap = () => {
      const { napAlarm } = this.state;
      const { soundType, soundFile } = this.props;
      
      this.dimScreen();

      as.setAlarm(napAlarm, ()=>{
        console.log("sound the alarm")
        try {
          ss.playSound({file: soundFile, fadetime: 0, loop: true})
        } catch (error) {
          console.log("Error", error)
        }
      });
    }

    stopNap = () => {
      ss.stopSound();
    }

    render() {
      const { alarmTime, napAlarm } = this.state;

      return (
        <Wrapee
          {...this.props}
          {...this.state}
          startNap={this.startNap}
          stopNap={this.stopNap}
          updateAlarmData={this.getAlarmData}
          alarmMoment={alarmTime}
          napMoment={napAlarm}
        />
      );
    }
  }

  const stateToProps = (state) => { return {...state.settings} }
  const dispatchToProps = (dispatch) => { 
    return {

    } 
  }

  return connect(stateToProps, dispatchToProps)(Wrapper);

}

export default connectServices;