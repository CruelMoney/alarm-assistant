import React, { Component } from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import DaysSelector from '../../components/DaysSelector';
import H2 from '../../components/text/H2';
import Body from '../../components/text/Body';
import Span from '../../components/text/Span';
import Link from '../../components/text/Link';

import TimePicker from '../../components/TimePicker';
import YesNo from '../../components/YesNo';

class Index extends Component {
  render() {
    return (
      <View style={{flex:1, justifyContent: "center"}}>
        <View style={styles.section}>
        <H2>
          Wake up sound
        </H2>
        <Body style={{marginBottom: 10}}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Body>
        <View style={{flexDirection: "column", alignSelf:"stretch",justifyContent:"space-around"}}>
          <View style={{flexDirection: "row", alignSelf:"stretch",justifyContent:"space-around"}}>
            <Link>Sound</Link>
            <Link>Radio</Link>
            <Link>Playlist</Link>
          </View>
          <Body style={{fontSize: 20, marginTop: 10}}>
              "Morning playlist"
          </Body>
        </View>
        </View>
        <View style={styles.section}>
        <H2>
          Fade in
        </H2>
        <Body style={{marginBottom: 10}}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Body>
          <View style={styles.timepickers}>
            <View>
              <TimePicker initHours={0} initMinutes={15} />
              <Span>
                Hours
              </Span>
            </View>
          </View>
        </View>
        <View>
          <H2>
          Speech
          </H2>
          <Body style={{marginBottom: 0}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <YesNo />
        </View>       
      </View>
    );
  }
}


const styles = StyleSheet.create({
  section:{
    margin: 20,
    justifyContent: "center",
    alignItems: 'center',
  },
  timepickers:{
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: "space-around"
  }
});

export default Index;
