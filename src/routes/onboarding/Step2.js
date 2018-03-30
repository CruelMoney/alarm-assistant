import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, AppState } from 'react-native';
import DaysSelector from '../../components/DaysSelector';
import H2 from '../../components/text/H2';
import Body from '../../components/text/Body';
import YesNo from '../../components/YesNo';
import TransportationPicker from '../../components/TransportationPicker';
import connectSettings from "../../containers/settings";
import RNCalendarEvents from 'react-native-calendar-events';
import Permissions from 'react-native-permissions'


class Index extends Component {
  constructor(props){
    super(props);
    this.state={
      useCalendar: undefined,
      useTransitTime: undefined,
      calendarPermissionState: 'undetermined',
      locationPermissionState: 'undetermined',
      appState: AppState.currentState
    }
    this.updatePermissions();
  }

  updatePermissions = () => {
    Permissions.checkMultiple(['event', 'location'])
    .then(response=>{
      this.setState({
        calendarPermissionState: response.event,
        locationPermissionState: response.location,
      });
    });
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      // App has come to the foreground,
      // update permissions as user might went to settings and changed them
      this.updatePermissions();
    }
    this.setState({appState: nextAppState});
  }

  _alertForPermission = ({title, desc, state, cb, cbDeny}) => {
    Alert.alert(
      title,
      desc,
      [
        {
          text: 'No',
          onPress: cbDeny,
          style: 'cancel',
        },
        state == 'undetermined'
          ? { text: 'OK', onPress: cb }
          : { text: 'Open Settings', onPress: Permissions.openSettings },
      ],
    )
  }

  useCalendar = async (val) => {
    const { calendarPermissionState } = this.state;
    const { changeSetting } = this.props;

    if(val && calendarPermissionState !== 'authorized'){
      this._alertForPermission({
        title: 'Can I access your calendar?',
        desc:  'I need access to create alarms automatically',
        state: calendarPermissionState,
        cb: async () => {
          const status = await Permissions.request('event');
          if(status === 'authorized'){
            changeSetting('calendar', val);
            this.setState({
              useCalendar: val,
              calendarPermissionState: status
            });
            RNCalendarEvents.findCalendars().then(console.log)
          }else{
            this.setState({
              useCalendar: false,
              calendarPermissionState: status
            });
            return alert('Could not activate calendar');
          }
        },
        cbDeny: () => this.setState({
          useCalendar: false
        })
      });
    }else{
      changeSetting('calendar', val);
      this.setState({useCalendar: val});
    }
  }

  useTransit = async (val) => {
    const { locationPermissionState } = this.state;
    const { changeSetting } = this.props;

    if(val && locationPermissionState !== 'authorized'){
      this._alertForPermission({
        title: 'Can I access your location?',
        desc:  'I need you location to calculate the transit time',
        state: locationPermissionState,
        cb: async () => {
          const status = await Permissions.request('location');
          if(status === 'authorized'){
            changeSetting('transit', val)
            this.setState({
              useTransitTime: val, 
              locationPermissionState: status
            });
            navigator.geolocation.getCurrentPosition(console.log);
          }else{
            this.setState({
              useTransitTime: false, 
              locationPermissionState: status
            });
            return alert('Could not activate transit');
          }
        },
        cbDeny: () => this.setState({
          useTransitTime: false
        })
      });
    }else{
      changeSetting('transit', val)
      this.setState({useTransitTime: val});
    }   
  }
  
  
  render() {
    const { changeSetting } = this.props;
    const {useCalendar, useTransitTime} = this.state;

    return (
      <View style={{flex:1,
        flexDirection: "column", 
        margin: 30,
        marginTop: 40,
        marginBottom: 20,
        justifyContent: "space-between", 
        alignItems:"center"}}>
        <View >
          <H2 style={{color:"#fff"}}>
            Use calendar
          </H2>
          <Body style={{color:"#fff", marginBottom: 0}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <YesNo
          controlled={true}
          value={useCalendar}
          onChange={this.useCalendar}/>
        </View>
        <View style={{opacity: useCalendar ? 1 : 0.5}}>
          <H2 style={{color:"#fff"}}>
            Include transit time
          </H2>
          <Body style={{color:"#fff", marginBottom: 0}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <YesNo 
          disabled={!useCalendar}
          controlled={true}
          value={useTransitTime}
          onChange={this.useTransit}/>
        </View>
        <View style={{opacity: (useTransitTime && useCalendar) ? 1 : 0.5}}>
          <H2 style={{color:"#fff"}}>
            Transportation method
          </H2>
          <TransportationPicker
          disabled={!useTransitTime || !useCalendar}
          onChange={val=>{
            changeSetting('transportationMethod', val)
          }}
          />
        </View> 
      </View>
    );
  }
}


const styles = StyleSheet.create({
  timepickers:{
    flexDirection: 'row',
    justifyContent: "space-around"
  }
});

export default connectSettings(Index);
