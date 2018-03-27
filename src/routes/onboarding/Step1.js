import React, { Component } from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import DaysSelector from '../../components/DaysSelector';
import H2 from '../../components/text/H2';
import Body from '../../components/text/Body';
import Span from '../../components/text/Span';
import TimePicker from '../../components/TimePicker';

class Index extends Component {
  render() {
    return (
      <View>
        <View style={styles.section}>
        <H2 style={{color:"#fff"}}>
          Days of the week
        </H2>
        <DaysSelector/>
        </View>
        <View style={styles.section}>
        <H2 style={{color:"#fff"}}>
          Latest time to wake up
        </H2>
        <Body style={{color:"#fff", marginBottom: 10}}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Body>
          <View style={styles.timepickers}>
            <View>
              <TimePicker initHours={10} initMinutes={0} />
              <Span>
                Weekdays
              </Span>
            </View>
            <View>
              <TimePicker initHours={12} initMinutes={0} />
              <Span>
                Weekends
              </Span>
            </View>
          </View>
        </View>
        <View style={styles.section}>
        <H2 style={{color:"#fff"}}>
          Latest time to wake up
        </H2>
        <Body style={{color:"#fff", marginBottom: 10,}}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Body>
          <View style={styles.timepickers}>
            <View>
              <TimePicker initHours={7} initMinutes={30} suffix={"hours"} duration />
              <Span>
                Weekdays
              </Span>
            </View>
            <View>
              <TimePicker initHours={9} initMinutes={0}  suffix={"hours"} duration />
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
    margin: 20
  },
  timepickers:{
    flexDirection: 'row',
    justifyContent: "space-around"
  }
});

export default Index;
