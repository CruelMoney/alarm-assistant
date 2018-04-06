import React, { Component } from 'react';
import {  View, Text, StyleSheet, Animated } from 'react-native';
import Layout from './Layout';
import MyButton from '../Button';
import * as SoundService from '../../../services/SoundService';
import {getTimeColor} from '../../../utils/colors';
import Color from 'color';
import _ from 'lodash';
import Body from '../../../components/text/Body';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sleeping: false
    };
    this.animateFunc = null
  }

  toggleSleep = _.throttle(() => {
    const {sleeping} = this.state;
    this.animateFunc(sleeping);
    this.setState({
      sleeping: !sleeping
    });
  }, 750, { 'trailing': false })

  render() {
    const { navigate } = this.props.navigation;
    const color = Color(getTimeColor());
    
    return (
      <Layout
      registerAnimate={fun => this.animateFunc = fun}
      menu={
          <View style={{width:'100%'}}>
           <MyButton 
              onPress={this.toggleSleep}
              label={"NAP"} 
              underlayColor={color.darken(0.15).string()}
              style={{backgroundColor: color.darken(0.1).string()}} />
            <MyButton 
             onPress={() => navigate('GoToSleep')}
              label={"SLEEP"} 
              underlayColor={color.darken(0.25).string()}
              style={{backgroundColor: color.darken(0.2).string()}} />
          </View>
        }
      activeText={
        <View>
        <Body>
          Nap for
        </Body> 
          <Text 
            style={{
            fontSize: 46, 
            fontFamily: "AvenirNext-Bold",
            textAlign: 'center',
            color: '#fff'
            }}>
            20
            </Text>
        <Body>
          minutes
        </Body> 
        </View>
      }
      />
    );

  }
}


const styles = StyleSheet.create({
  highlight: {
    color: '#FFCC4C',
  },
  text:{
    color: 'white'
  }
});