import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback  } from 'react-native';

class ToggleButton extends Component {
  state={
    toggled: false
  }

  onPress = () => {
    const { onPressOverride, onChange, disabled } = this.props;
    if(!disabled){
      if(onPressOverride) return onPressOverride();

      const {toggled} = this.state;
      this.setState({
        toggled: !toggled
      });

      !!onChange && onChange(!toggled);
    }
  }

  componentWillReceiveProps(nextprops){
    const { active, disabled } = nextprops;
    if(!disabled && typeof active !== "undefined"){
      this.setState({
        toggled: active
      });
    }
  }

  render() {
    const {style, active} = this.props;
    const {toggled} = this.state;

    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPress}
      >
        <View style={{
          borderRadius: 50,
          borderWidth: 3,
          borderColor: '#fff',
          height: 50,
          width: 50,
          backgroundColor: toggled ? "#fff" : "transparent",
          alignItems: "center",
          justifyContent: "center",
          ...style
        }}>
          <Text style={StyleSheet.flatten([
            styles.buttonText, 
            toggled ? styles.buttonTextToggled : null
            ]) }>
            {this.props.label}
          </Text>
          {this.props.children}
        </View>
      </ TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  buttonText:{
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonTextToggled: {
    color: "#FFC371",
  }
});

export default ToggleButton;
