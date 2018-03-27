import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback  } from 'react-native';

class ToggleButton extends Component {
  state={
    toggled: false
  }

  onPress = () => {
    const {toggled} = this.state;
    this.setState({
      toggled: !toggled
    });
  }

  render() {
    const {style} = this.props;
    const {toggled} = this.state;
    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPress}
      >
        <View style={{
          borderRadius: 60,
          borderWidth: 3,
          borderColor: '#fff',
          height: 60,
          width: 60,
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
