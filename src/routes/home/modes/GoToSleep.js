import React, { Component, StyleSheet } from 'react';
import {  View, Text, } from 'react-native';

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    textAlign: "left",
    fontFamily: 'avenir-next-heavy',
    fontSize: 34,
    color: '#fff',
    lineHeight: 44
  },
  highlight: {
    color: '#FFCC4C',
  }
});

export default class Index extends Component {
  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.text}>
          Go to sleep now to get a full <Text style={styles.highlight}>7.5</Text> hours of sleep. Your first event is scheduled at <Text style={styles.highlight}>10:00</Text> tomorrow,  and I will wake you up at <Text style={styles.highlight}>8:00</Text>, with “Morning playlist”.
        </Text>
      </View>
    );
  }
}
