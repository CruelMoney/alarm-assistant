import React, { Component } from 'react';
import {  View, Text, StyleSheet, ScrollView } from 'react-native';
import connectSettings from '../../../containers/settings';
import H2 from '../../../components/text/H2';
import Body from '../../../components/text/Body';
import { askCalendarPermission, getCalendars } from '../../../services/CalendarService';
import {getTimeColor} from '../../../utils/colors';
import YesNo from '../../../components/YesNo';
import ListItem from '../components/ListItem';
import CheckBox from '../../../components/CheckBox';
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
});




class Index extends Component {
  render() {
    const {changeSetting, speech} = this.props;
    const color = getTimeColor(true);

    return (
      <ScrollView style={{backgroundColor: "#FFF"}}>
        <View style={styles.section}>
          <H2 style={styles.headline}>
            Use speech
          </H2>
          <Body style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <YesNo
          inverted
          controlled={true}
          value={speech}
          onChange={val => changeSetting('speech', val)}/>
        </View>
      </ScrollView>
    );
  }
}


export default connectSettings(Index);
