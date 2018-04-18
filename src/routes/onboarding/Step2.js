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
import { askCalendarPermission } from '../../services/CalendarService';
import { askLocationPermission } from '../../services/TransitService';

class Index extends Component {
  constructor(props){
    super(props);
    this.state={
      useCalendar: undefined,
      useTransit: undefined,
    }
  }


  useCalendar = async (val) => {
    const { changeSetting } = this.props;
    let granted = val;
    if(val){
      granted = await askCalendarPermission();
    }
    changeSetting('calendar', granted);
    this.setState({useCalendar: granted});
  }

  useTransit = async (val) => {
    const { changeSetting } = this.props;
    let granted = val;
    if(val){
      granted = await askLocationPermission();
    }
    changeSetting('transit', granted);
    this.setState({useTransit: granted});
  }
  
  
  render() {
    const { changeSetting } = this.props;
    const {useCalendar, useTransit} = this.state;

    return (
      <View style={{flex:1,
        flexDirection: "column", 
        margin: 30,
        marginTop: 40,
        marginBottom: 20,
        justifyContent: "center", 
        alignItems:"center"}}>
        <View style={styles.section}>
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
        <View style={StyleSheet.flatten([styles.section, {
          opacity: (useCalendar) ? 1 : 0.5
          }])}>
          <H2 style={{color:"#fff"}}>
            Include transit time
          </H2>
          <Body style={{color:"#fff", marginBottom: 0}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <YesNo 
          disabled={!useCalendar}
          controlled={true}
          value={useTransit}
          onChange={this.useTransit}/>
        </View>
        <View style={StyleSheet.flatten([styles.section, {
          marginBottom:0,
          opacity: (useTransit && useCalendar) ? 1 : 0.5
          }])}>
      
          <H2 style={{color:"#fff"}}>
            Transportation method
          </H2>
          <TransportationPicker
          disabled={!useTransit || !useCalendar}
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
  section:{
    justifyContent: "center",
    alignItems: 'center',
    marginBottom: 30,
  },
  timepickers:{
    flexDirection: 'row',
    justifyContent: "space-around"
  }
});

export default connectSettings(Index);
