import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import connectSettings from '../../../containers/settings';
import H2 from '../../../components/text/H2';
import Body from '../../../components/text/Body';
import TimePicker from '../../../components/TimePicker';
import {getTimeColor} from '../../../utils/colors';

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
    marginBottom: 50,
  },
  timepicker:{
    alignItems: 'center',
    marginTop: 20,
  },
  timepickerText:{
    color: getTimeColor(true),
  }
});

class Index extends Component {
  render() {
    const {changeSetting, napLength} = this.props;
    return (
      <View style={{backgroundColor: "#FFF"}}>
          <H2 style={styles.headline}>
            Default nap length
          </H2>
          <Body style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <View style={styles.timepicker}>
              <TimePicker 
              textStyle={styles.timepickerText}
              onChange={(h, m) => changeSetting('napLength', (h*60+m))}
              initHours={0} initMinutes={napLength} suffix={"hours"} duration />
          </View>
      </View>
    );
  }
}


export default connectSettings(Index);
