import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import connectSettings from '../../../containers/settings';
import H2 from '../../../components/text/H2';
import Body from '../../../components/text/Body';
import SoundPicker from '../../../components/SoundPicker';
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
    marginBottom: 50,
  },
  soundpicker:{
    alignItems: 'center',
    marginTop: 20,
  },
  soundpickerText:{
    color: getTimeColor(true),
  }
});

class Index extends Component {
  render() {
    const {changeSetting, napLength, soundType, soundFile, soundName, fadeIn} = this.props;
    const minutes = Math.floor((fadeIn/100/60)%60);
    const hours   = Math.floor(fadeIn/100/60/60);

    return (
      <View style={{backgroundColor: "#FFF"}}>
          <H2 style={styles.headline}>
            Alarm sound
          </H2>
          <Body style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <View style={styles.soundpicker}>
              <SoundPicker
                soundType={soundType}
                soundFile={soundFile}
                soundName={soundName}
                textStyle={styles.soundpickerText}
                onChange={(type, val, label)=>{
                  changeSetting('soundType', type);
                  changeSetting('soundFile', val);
                  changeSetting('soundName', label)
                }}
                />
          </View>
          <View style={styles.soundpicker}>
          <H2 style={styles.headline}>
            Wake up phase
          </H2>
          <Body style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <TimePicker 
              onChange={(h,m)=>{
                changeSetting('fadeIn', (h*60+m)*60*100)
              }}
              suffix={"hours"}
              initHours={hours} initMinutes={minutes} />
          </View>
      </View>
    );
  }
}


export default connectSettings(Index);
