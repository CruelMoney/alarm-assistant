import        { connect          } from 'react-redux' ;
import React, { Component        } from 'react'       ;
import        { View     , Text, } from 'react-native';
import moment from 'moment';
import * as cs from '../services/CalendarService';
import * as as from '../services/AlarmService';
import * as ts from '../services/TransitService';

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
    state={
      loading: true
    }


    async componentDidMount(){
      const {
        calendar, 
        calendars, 
        transit, 
        transportationMethod,
        preparationTime
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
      
      // save all in state
      this.setState({
        alarmTime: firstAlarm,
        mode,
        loading: false
      });
    }

    getText = () => {
      const { alarmTime, loading, mode } = this.state;
      const { soundName } = this.props;
      if(loading || !alarmTime) return `Loading`;
      const sleepLength = Math.round(alarmTime.diff(moment(), 'minute')/60, 1);
      switch (mode) {
        case 'event':
          return `Go to sleep now to get ${sleepLength} hours of sleep. I will wake you up at ${alarmTime.format('HH:mm')}, with ${soundName}.`
        case 'latest':
          return `Go to sleep now to get ${sleepLength} hours of sleep. I will wake you up at ${alarmTime.format('HH:mm')}, with ${soundName}.`
        case 'minimum':
          return `Go to sleep now to get a full ${sleepLength} hours of sleep. I will wake you up at ${alarmTime.format('HH:mm')}, with ${soundName}.`
        default:
          return `Go to sleep now to get ${sleepLength} hours of sleep. I will wake you up at ${alarmTime.format('HH:mm')}, with ${soundName}.`
      }
     
    }

    render() {
      return (
        <Wrapee
          {...this.props}
          display={this.getText()}
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