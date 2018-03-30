import React, { Component } from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import DaysSelector from '../../components/DaysSelector';
import H2 from '../../components/text/H2';
import Body from '../../components/text/Body';
import YesNo from '../../components/YesNo';
import TransportationPicker from '../../components/TransportationPicker';
import connectSettings from "../../containers/settings";

class Index extends Component {
  state={
    useCalendar: false,
    useTransitTime: false
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
          onChange={(val) => {
            changeSetting('calendar', val)
            this.setState({useCalendar: val})
            }}/>
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
          onChange={(val) => {
            changeSetting('transit', val)
            this.setState({useTransitTime: val});
            }}/>
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
