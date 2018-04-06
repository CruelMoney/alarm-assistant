import React, { Component } from 'react';
import {  View, Text, Image } from 'react-native';
import ToggleButton from './ToggleButton';
import walking from '../assets/images/walking.png';
import car from '../assets/images/Car.png';
import train from '../assets/images/Train.png';
import bicycle from '../assets/images/Bicycle.png';
import {getTimeColor} from '../utils/colors';

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

  onPress = (idx, val) => {
    const {onChange} = this.props;
    !!onChange && onChange(val);
    
    this.setState({
      activeIdx: idx
    });
  }

  render() {
    const { disabled } = this.props;
    const { activeIdx } = this.state;
    const activeColor = getTimeColor(true);
    return (
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      }}>
       <ToggleButton 
        disabled={disabled}
       active={activeIdx === 0}
       onPressOverride={()=>this.onPress(0, 'car')}
       style={styles.button} 
       >
        <Image 
        style={{width: 28, height:20, tintColor: activeIdx === 0 ? activeColor : "#fff" }}
        source={car} />
        </ ToggleButton>
        <ToggleButton 
         disabled={disabled}
       active={activeIdx === 1}
       onPressOverride={()=>this.onPress(1, 'walking')}
       style={styles.button} 
       >
        <Image 
        style={{width: 17, height:32, tintColor: activeIdx === 1 ? activeColor : "#fff" }}
        source={walking} />
        </ ToggleButton>
        <ToggleButton 
         disabled={disabled}
       active={activeIdx === 2}
       onPressOverride={()=>this.onPress(2, 'bicycle')}
       style={styles.button} 
       >
        <Image 
        style={{width: 31, height:17, tintColor: activeIdx === 2 ? activeColor : "#fff" }}
        source={bicycle} />
        </ ToggleButton>
        <ToggleButton 
         disabled={disabled}
        active={activeIdx === 3}
        onPressOverride={()=>this.onPress(3, 'public')}
        style={styles.button} 
       >
        <Image 
        style={{width: 22, height:26, tintColor: activeIdx === 3 ? activeColor : "#fff"}}
        source={train} />
        </ ToggleButton>
      </View>
      
    );
  }
}
