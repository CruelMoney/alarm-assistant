import React, { Component } from 'react';
import { View, Image, Text, StyleSheet  } from 'react-native';
import {getTimeColor} from '../utils/colors';
import checkmark from '../assets/images/Checkmark.png';

class CheckBox extends Component {

  render() {
    const {inverted, active} = this.props;
    const color = getTimeColor(true);

    let style = {
      text:{
        color: color,
        fontWeight: 'bold',
        fontSize: 16,
      },
      circle:{
        borderRadius: 50,
        borderWidth: 3,
        borderColor: color,
        height: 35,
        width: 35,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
      },
      checkmark:{
        tintColor: color, 
      }
    }

    let toggledStyle = {
      text:{
        ...style.text,
        color: "#fff",
      },
      circle:{
        ...style.circle,
        backgroundColor: color,
      },
      checkmark:{
        ...style.checkmark,
        tintColor: "#fff", 
      }
    }

    if(inverted){
      const temp = style;
      style = toggledStyle;
      toggledStyle = temp;
    }

    return (
        <View style={active ? toggledStyle.circle : style.circle}>
            {active ? 
             <Image 
             style={active ? toggledStyle.checkmark : style.checkmark}
             source={checkmark} />
            : null}
        </View>
    );
  }
}


export default CheckBox;
