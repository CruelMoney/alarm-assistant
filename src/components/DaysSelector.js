import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToggleButton from './ToggleButton';

class DaysSelector extends Component {
  render() {
    return (
      <View style={{
        flexDirection: "row"
      }}>
       <ToggleButton style={styles.button} label={"M"}/>
       <ToggleButton style={styles.button} label={"T"}/>
       <ToggleButton style={styles.button} label={"W"}/>
       <ToggleButton style={styles.button} label={"T"}/>
       <ToggleButton style={styles.button} label={"F"}/>
       <ToggleButton style={styles.button} label={"S"}/>
       <ToggleButton style={styles.button} label={"S"}/>
      </View>
    );
  }
}

const styles = {
  button:{
    width: 40,
    height: 40,
    margin: 5
  }
};

export default DaysSelector;
