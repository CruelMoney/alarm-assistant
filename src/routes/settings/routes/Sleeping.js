import React, { Component } from 'react';
import {  View, Text, StyleSheet, ScrollView } from 'react-native';
import connectSettings from '../../../containers/settings';
import H2 from '../../../components/text/H2';
import Body from '../../../components/text/Body';
import Span from '../../../components/text/Span';
import {getTimeColor} from '../../../utils/colors';
import TimePicker from '../../../components/TimePicker';


const styles = StyleSheet.create({
  headline:{
    color: '#9B9B9B',
    marginTop: 15,
  },
  text:{
    color: '#9B9B9B',
  },
  section:{
    justifyContent: "center",
    alignItems: 'center',
    marginBottom: 20,
  },
  timepickers:{
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: "space-around"
  }
  
});




class Index extends Component {

  render() {
    const { 
      changeSetting, 
      latestWeekends, 
      latestWeekdays, 
      sleepLengthWeekends, 
      sleepLengthWeekdays 
    } = this.props;

    return (
      <ScrollView style={{backgroundColor: "#FFF"}}>
        <View style={StyleSheet.flatten([styles.section])}>
             <H2 dark style={styles.headline}>
            Ideal sleep length
          </H2>
          <Body dark style={{marginBottom: 10,}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <View style={styles.timepickers}>
            <View> 
              <TimePicker 
              colored
              onChange={(h, m) => changeSetting('sleepLengthWeekdays', (h*60+m))}
              initHours={0} initMinutes={sleepLengthWeekdays} suffix={"hours"} duration />
              <Span dark>
                Weekdays
              </Span>
            </View>
            <View>
              <TimePicker 
              colored
              onChange={(h, m) => changeSetting('sleepLengthWeekends', (h*60+m))}
              initHours={0} initMinutes={sleepLengthWeekends}  suffix={"hours"} duration />
              <Span dark>
                Weekends
              </Span>
            </View>
          </View>
        </View>  
        <View style={styles.section}>
             <H2 dark style={styles.headline}>
            Latest time to wake up
          </H2>
          <Body dark style={{marginBottom: 10}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <View style={styles.timepickers}>
            <View>
              <TimePicker 
              colored
              onChange={(h, m) => changeSetting('latestWeekdays', {h: h, m: m})}
              initHours={latestWeekdays.h} 
              initMinutes={latestWeekdays.m} 
              />
              <Span dark>
                Weekdays
              </Span>
            </View>
            <View>
              <TimePicker 
              colored
              onChange={(h, m) => changeSetting('latestWeekends', {h: h, m: m})}
              initHours={latestWeekends.h} initMinutes={latestWeekends.m} />
              <Span dark>
                Weekends
              </Span>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}


export default connectSettings(Index);
