import React, { Component } from 'react';
import {  
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  DatePickerIOS, 
  TouchableWithoutFeedback,
  TouchableOpacity } from 'react-native';

export default class TimePicker extends Component {

  constructor(props){
    super(props);
    let initDate = new Date();
    (props.initHours === 0 || !!props.initHours) && initDate.setHours(props.initHours);
    (props.initMinutes === 0 || !!props.initMinutes) && initDate.setMinutes(props.initMinutes);

    this.state = {
      chosenDate: initDate,
      visible: false
    };
  }

  setDate = (newDate)  => {
    const { onChange } = this.props;
    this.setState({chosenDate: newDate});
    !!onChange && onChange(newDate.getHours(), newDate.getMinutes())
  } 

  showModal = () => {
    this.setState({visible: true});
  }
  closeModal = () => {
    this.setState({visible: false});
  }
  render() {
    const {duration, suffix, textStyle} = this.props;
    const {chosenDate} = this.state;
    let hours = chosenDate.getHours();
    let minutes = chosenDate.getMinutes();
    if(!duration){
      hours = String(hours).length < 2 ? ("0"+hours) :hours;
    }
    minutes = String(minutes).length < 2 ? ("0"+minutes) : minutes;

    const delimiter = ':';
    const timeString = `${hours}${delimiter}${minutes}`;

    

    return (
      <View>
         <TouchableOpacity onPress={this.showModal}>
          <View>
            <Text style={StyleSheet.flatten([styles.timeText, textStyle])} >
              {timeString}
              <Text style={StyleSheet.flatten([styles.suffix, textStyle])} >
               {" " + suffix}
               </Text>
            </Text>
          </View>
        </TouchableOpacity>
       
        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.visible}
          onRequestClose={this.closeModal}>
          <TouchableWithoutFeedback //this touchable closes modal
                                onPress={() => {
                                    this.closeModal();
                                }}>
          <View style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: "flex-end"}}> 
            <View style={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    alignSelf: "stretch",
                    }}
                    >
            <DatePickerIOS
              date={chosenDate}
              onDateChange={this.setDate}
              mode={"time"}
              locale="da"
            />
           
            </View>
              
          </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  slideContainer:{
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.8)"
  },
  timeText:{
    color: "#fff",
    fontSize: 26,
    fontFamily: 'AvenirNext-Medium',
  },
  suffix:{
    color: "#fff",
    fontSize: 16,
    fontFamily: 'AvenirNext-Medium',
  }
});