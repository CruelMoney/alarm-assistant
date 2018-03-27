import React, { Component } from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import GradientBG from '../../components/GradientBG';
import Step1 from './Step1';
import Footer from './Footer';

class Index extends Component {
  render() {
    return (
      <GradientBG>
      
          <View style={{flex: 1,justifyContent: "center", alignItems: "center"}}>
            <Step1 />
          </View>
          <Footer />
      </GradientBG>
    );
  }
}


const styles = StyleSheet.create({
  section:{
    marginLeft: 10,
    marginRight: 10
  },
  timepickers:{
    flexDirection: 'row',
    justifyContent: "space-around"
  }
});

export default Index;
