import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToggleButton from './ToggleButton';

class DaysSelector extends Component {
  state={
    selectedDays: {}
  }

  onChange = (day, selected) => {
    const { onChange } = this.props;
    const { selectedDays } = this.state;

    if(selected){
      selectedDays[day] = true;
    }else{
      delete selectedDays[day];
    }
    this.setState({
      selectedDays: selectedDays
    });
    !!onChange && onChange(Object.keys(selectedDays));
  }

  render() {
    return (
      <View style={{
        flexDirection: "row"
      }}>
       <ToggleButton 
        onChange={(val)=>this.onChange('monday', val)}
        style={styles.button} label={"M"}/>
       <ToggleButton 
        onChange={(val)=>this.onChange('tuesday', val)}
       style={styles.button} label={"T"}/>
       <ToggleButton 
        onChange={(val)=>this.onChange('wednesday', val)}
       style={styles.button} label={"W"}/>
       <ToggleButton 
        onChange={(val)=>this.onChange('thursday', val)}
        style={styles.button} label={"T"}/>
       <ToggleButton 
        onChange={(val)=>this.onChange('friday', val)}
        style={styles.button} label={"F"}/>
       <ToggleButton 
        onChange={(val)=>this.onChange('saturday', val)}
       style={styles.button} label={"S"}/>
       <ToggleButton 
        onChange={(val)=>this.onChange('sunday', val)}
        style={styles.button} label={"S"}/>
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
