import React, { Component } from 'react';
import {  View, Text, StyleSheet, ScrollView } from 'react-native';
import connectSettings from '../../../containers/settings';
import H2 from '../../../components/text/H2';
import Body from '../../../components/text/Body';
import Span from '../../../components/text/Span';
import {getTimeColor} from '../../../utils/colors';
import { askLocationPermission } from '../../../services/TransitService';
import YesNo from '../../../components/YesNo';
import TransportationPicker from '../../../components/TransportationPicker';


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
  }
});


class Index extends Component {

  toggleTransit = async (val) => {
    const { changeSetting } = this.props;
    let granted = val;
    if(val){
      granted = await askLocationPermission();
    }
    changeSetting('transit', granted);
  }
  
  render() {
    const { 
      changeSetting, 
      calendar,
      transit,
      transportationMethod
    } = this.props;

    return (
      <ScrollView>
        <View style={StyleSheet.flatten([styles.section, {
          opacity: (calendar) ? 1 : 0.5
          }])}>
          <H2 style={styles.headline}>
            Include transit time
          </H2>
          <Body style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <YesNo 
          inverted
          disabled={!calendar}
          controlled={true}
          value={transit}
          onChange={this.toggleTransit}/>
        </View>
        <View style={StyleSheet.flatten([styles.section, {
          opacity: (transit && calendar) ? 1 : 0.5
          }])}>
      
      <H2 style={styles.headline}>
            Transportation method
          </H2>
          <TransportationPicker
          inverted
          disabled={!transit || !calendar}
          initialValue={transportationMethod}
          onChange={val=>{
            changeSetting('transportationMethod', val)
          }}
          />
        </View> 
      </ScrollView>
    );
  }
}


export default connectSettings(Index);
