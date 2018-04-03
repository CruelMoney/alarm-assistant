import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import Layout from './Layout';
import MyButton from '../Button';
import * as SoundService from '../../../services/SoundService';
import {getTimeColor} from '../../../utils/colors';
import Color from 'color';
export default class Index extends Component {
  
  componentDidMount(){
    console.log("mounted")
  }
  render() {
    const { navigate } = this.props.navigation;
    const color = Color(getTimeColor());
    
    return (
      <Layout
        menu={
          <View style={{width:'100%'}}>
            <MyButton 
              onPress={()=>SoundService.playSound({
                file:'bird_chirps.mp3',
                fadetime: 600000
              })}
              label={"SLEEP"} 
              style={{backgroundColor: color.darken(0.1).string()}} />
              <MyButton 
              onPress={() => navigate('Nap')}
              label={"NAP"} 
              style={{backgroundColor: color.darken(0.2).string()}} />
          </View>
        }
      >
      </Layout>
    );
  }
}


const styles = StyleSheet.create({
  highlight: {
    color: '#FFCC4C',
  },
});