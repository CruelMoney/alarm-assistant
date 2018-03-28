import React, { Component } from 'react';
import {  View, Text, Image } from 'react-native';
import ToggleButton from './ToggleButton';
import walking from '../assets/images/walking.png';
import car from '../assets/images/Car.png';
import train from '../assets/images/Train.png';
import bicycle from '../assets/images/Bicycle.png';

const styles = {
  button:{
    margin: 15,
    marginTop: 5,
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row',
  }
};

export default class componentName extends Component {
  state={
    activeIdx: false
  }

  onPress = (idx) => {
    const {onChange} = this.props;
    !!onChange && onChange(idx);
    
    this.setState({
      activeIdx: idx
    });
  }

  render() {
    const { disabled } = this.props;
    const { activeIdx } = this.state;

    return (
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      }}>
       <ToggleButton 
        disabled={disabled}
       active={activeIdx === 0}
       onPressOverride={()=>this.onPress(0)}
       style={styles.button} 
       >
        <Image 
        style={{width: 28, height:20, tintColor: activeIdx === 0 ? "#FFC371" : "#fff" }}
        source={car} />
        </ ToggleButton>
        <ToggleButton 
         disabled={disabled}
       active={activeIdx === 1}
       onPressOverride={()=>this.onPress(1)}
       style={styles.button} 
       >
        <Image 
        style={{width: 17, height:32, tintColor: activeIdx === 1 ? "#FFC371" : "#fff" }}
        source={walking} />
        </ ToggleButton>
        <ToggleButton 
         disabled={disabled}
       active={activeIdx === 2}
       onPressOverride={()=>this.onPress(2)}
       style={styles.button} 
       >
        <Image 
        style={{width: 31, height:17, tintColor: activeIdx === 2 ? "#FFC371" : "#fff" }}
        source={bicycle} />
        </ ToggleButton>
        <ToggleButton 
         disabled={disabled}
       active={activeIdx === 3}
       onPressOverride={()=>this.onPress(3)}
       style={styles.button} 
       >
        <Image 
        style={{width: 22, height:26, tintColor: activeIdx === 3 ? "#FFC371" : "#fff"}}
        source={train} />
        </ ToggleButton>
      </View>
      
    );
  }
}
