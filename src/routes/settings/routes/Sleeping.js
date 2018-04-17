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
    const {changeSetting} = this.props;
    const color = getTimeColor(true);

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
              inverted
              onChange={(h, m) => changeSetting('sleepLengthWeekdays', (h*60+m))}
              initHours={7} initMinutes={30} suffix={"hours"} duration />
              <Span dark>
                Weekdays
              </Span>
            </View>
            <View>
              <TimePicker 
              inverted
              onChange={(h, m) => changeSetting('sleepLengthWeekends', (h*60+m))}
              initHours={9} initMinutes={0}  suffix={"hours"} duration />
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
              inverted
              onChange={(h, m) => changeSetting('latestWeekdays', {h: h, m: m})}
              initHours={10} 
              initMinutes={0} 
              />
              <Span dark>
                Weekdays
              </Span>
            </View>
            <View>
              <TimePicker 
              inverted
               onChange={(h, m) => changeSetting('latestWeekends', {h: h, m: m})}
              initHours={12} initMinutes={0} />
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
