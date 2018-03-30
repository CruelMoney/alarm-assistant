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
    const { changeSetting } = this.props;


    return (
      <View style={{
        flex:1, 
        margin: 30,
        marginTop: 40,
        marginBottom: 20,
        flexDirection: "column", 
        justifyContent: "space-between", 
        alignItems:"center"}}>
        <View style={styles.section}>
        <H2>
          Days of the week
        </H2>
        <DaysSelector
          onChange={(val) => changeSetting('latest', val)}
        />
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
              initHours={10} 
              initMinutes={0} 
              />
              <Span>
                Weekdays
              </Span>
            </View>
            <View>
              <TimePicker 
               onChange={(h, m) => changeSetting('latestWeekends', {h: h, m: m})}
              initHours={12} initMinutes={0} />
              <Span>
                Weekends
              </Span>
            </View>
          </View>
        </View>
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
              initHours={7} initMinutes={30} suffix={"hours"} duration />
              <Span>
                Weekdays
              </Span>
            </View>
            <View>
              <TimePicker 
              onChange={(h, m) => changeSetting('sleepLengthWeekends', (h*60+m))}
              initHours={9} initMinutes={0}  suffix={"hours"} duration />
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
  },
  timepickers:{
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: "space-around"
  }
});

export default connectSettings(Index);
