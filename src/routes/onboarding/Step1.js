import React, { Component } from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import DaysSelector from '../../components/DaysSelector';
import H2 from '../../components/text/H2';
import Body from '../../components/text/Body';
import Span from '../../components/text/Span';
import TimePicker from '../../components/TimePicker';
import connectSettings from "../../containers/settings";

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
      <View style={{
        flex:1, 
        margin: 30,
        marginTop: 40,
        marginBottom: 20,
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems:"center"}}>
        {/* <View style={styles.section}>
        <H2>
          Days of the week
        </H2>
        <DaysSelector
          onChange={(val) => changeSetting('latest', val)}
        />
        </View> */}
        <View style={styles.section}>
          <H2>
            Ideal sleep length
          </H2>
          <Body style={{marginBottom: 10,}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <View style={styles.timepickers}>
            <View> 
              <TimePicker 
              onChange={(h, m) => changeSetting('sleepLengthWeekdays', (h*60+m))}
              initHours={0} initMinutes={sleepLengthWeekdays} suffix={"hours"} duration />
              <Span>
                Weekdays
              </Span>
            </View>
            <View>
              <TimePicker 
              onChange={(h, m) => changeSetting('sleepLengthWeekends', (h*60+m))}
              initHours={0} initMinutes={sleepLengthWeekends}  suffix={"hours"} duration />
              <Span>
                Weekends
              </Span>
            </View>
          </View>
        </View>  
        <View style={styles.section}>
          <H2>
            Latest time to wake up
          </H2>
          <Body style={{marginBottom: 10}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <View style={styles.timepickers}>
            <View>
              <TimePicker 
              onChange={(h, m) => changeSetting('latestWeekdays', {h: h, m: m})}
              initHours={latestWeekdays.h} 
              initMinutes={latestWeekdays.m} 
              />
              <Span>
                Weekdays
              </Span>
            </View>
            <View>
              <TimePicker 
               onChange={(h, m) => changeSetting('latestWeekends', {h: h, m: m})}
               initHours={latestWeekends.h} 
              initMinutes={latestWeekends.m} 
              />
              <Span>
                Weekends
              </Span>
            </View>
          </View>
        </View>
            
      </View>
    );
  }
}


const styles = StyleSheet.create({
  section:{
    justifyContent: "center",
    alignItems: 'center',
    marginBottom: 50,
  },
  timepickers:{
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: "space-around"
  }
});

export default connectSettings(Index);
