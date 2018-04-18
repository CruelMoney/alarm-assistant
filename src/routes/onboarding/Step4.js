import React, { Component } from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import DaysSelector from '../../components/DaysSelector';
import H2 from '../../components/text/H2';
import Body from '../../components/text/Body';
import Span from '../../components/text/Span';
import Link from '../../components/text/Link';
import connectSettings from "../../containers/settings";
import TimePicker from '../../components/TimePicker';
import YesNo from '../../components/YesNo';
import SoundPicker from '../../components/SoundPicker';

class Index extends Component {
  componentDidMount(){
     
  }

  render() {
    let { changeSetting, reports, fadeIn } = this.props;

    return (
      <View style={{flex:1, 
        margin: 30,
        marginTop: 40,
        marginBottom: 20,
        flexDirection: "column", 
        justifyContent: "space-between", 
        alignItems:"center"}}>
        <View style={styles.section}>
        <H2>
          Wake up sound
        </H2>
        <Body style={{marginBottom: 10}}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Body>
        <SoundPicker
        onChange={(type, val, label)=>{
          changeSetting('soundType', type);
          changeSetting('soundFile', val);
          changeSetting('soundName', label)
        }}
        />
        </View>
        <View style={styles.section}>
        <H2>
          Wake up phase
        </H2>
        <Body style={{marginBottom: 10}}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Body>
          <View style={styles.timepickers}>
            <View>
              <TimePicker 
              onChange={(h,m)=>{
                changeSetting('fadeIn', (h*60+m))
              }}
              duration
              suffix={"hours"}
              initHours={0} initMinutes={fadeIn} />
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
          <YesNo
           onChange={(val)=>{
            changeSetting('speech', val)
          }} />
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
