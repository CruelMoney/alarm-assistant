import        { connect          } from 'react-redux' ;
import React, { Component        } from 'react'       ;
import        { View     , Text, } from 'react-native';
import moment from 'moment';
import * as cs from '../services/CalendarService';
import * as as from '../services/AlarmService';
import * as ts from '../services/TransitService';
import * as ss from '../services/SoundService';
import DeviceBrightness from 'react-native-device-brightness';
import KeepAwake from 'react-native-keep-awake';
import { changeSetting } from '../actions';

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
        eventMoment: alarmTime,
        mode,
        napAlarm,
        napMode, 
        maxNap,
        event: event,
        loading: false
      });
    }

    updateNapdata = () => {
      const { eventMoment } = this.state;
      const { napLength } = this.props;
      
      // calculate nap time
      const {napAlarm, napMode, maxNap} = as.calculateNapTime({
        alarmTime: eventMoment,
        napLength: napLength
      });

      this.setState({
        napAlarm,
        napMode, 
        maxNap
      });
    }

    async componentDidMount(){
      await this.getAlarmData();

      if(!this.updateNapInterval){
        this.updateNapInterval = setInterval( _ => {
          this.updateNapdata();
        }, 1000);
      }
    }

    componentWillUnmount(){
      !!this.updateNapInterval && clearInterval(this.updateNapInterval);
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
      this.setAlarm(napAlarm, 0);
    }

    stopNap = () => {
      this.cancelAlarm();
    }

    setAlarm = (startAlarm, fadeIn) => {
      const { soundType, soundFile } = this.props;

      KeepAwake.activate(); // keep screen awake
      as.setAlarm(startAlarm, ()=>{
        console.log("sound the alarm")
        try {
          switch (soundType) {
            case "playlist":
              ss.playPlaylist({name: soundFile, fadetime: fadeIn});
              break;
            case "sound":
              ss.playSound({file: soundFile, fadetime: fadeIn, loop: true});
              break;
            default:
              break;
          }
          this.setState({
            waking: true
          });
        } catch (error) {
          console.log("Error", error)
        }
      });

      this.setState({
        sleeping: true
      });
    }

    startSleep = () => {
      const { alarmTime } = this.state;
      const { fadeIn } = this.props;
      const startAlarm = alarmTime.subtract(fadeIn, 'millisecond');
      this.dimScreen();
      this.setAlarm(startAlarm, fadeIn);
    }

    stopSleep = () => {
      this.cancelAlarm();
    }

    cancelAlarm = () => {
      as.cancelAlarm();
      KeepAwake.deactivate();
      this.setState({
        sleeping: false
      });
    }

    wakeFromNap = () => {
      ss.stopSound();
      this.setState({
        sleeping: false,
        waking: false
      });
    }

    render() {
      const { alarmTime, napAlarm } = this.state;

      return (
        <Wrapee
          {...this.props}
          {...this.state}
          startNap={this.startNap}
          stopNap={this.stopNap}
          startSleep={this.startSleep}
          stopSleep={this.stopSleep}
          updateAlarmData={this.getAlarmData}
          alarmMoment={alarmTime}
          napMoment={napAlarm}
          wakeFromNap={this.wakeFromNap}
        />
      );
    }
  }

  const stateToProps = (state) => { return {...state.settings} }
  const dispatchToProps = (dispatch) => { 
    return {
      changeSetting: (key, value) => dispatch(changeSetting(key, value))
    } 
  }

  return connect(stateToProps, dispatchToProps)(Wrapper);

}

export default connectServices;