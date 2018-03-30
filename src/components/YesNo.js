import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import ToggleButton from './ToggleButton';

const styles = {
  button:{
    margin: 15
  }
};

export default class componentName extends Component {
  state={
    yes: undefined
  }

  onPress = (yes) => {
    const {onChange} = this.props;
      !!onChange && onChange(yes);

      this.setState({
        yes: yes
      });
  }

  render() {
    const {disabled, controlled, value} = this.props;
    let {yes} = this.state;
    yes = !!controlled ? value : yes;

    return (
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      }}>
       <ToggleButton 
        active={yes}
        disabled={disabled}
        onPressOverride={()=>this.onPress(true)}
        style={styles.button} 
        label={"YES"}/>
       <ToggleButton 
        disabled={disabled}
        onPressOverride={()=>this.onPress(false)}
        active={typeof yes === "undefined" ? undefined : !yes}
        style={styles.button} 
        label={"NO"}/>
      </View>
    );
  }
}
