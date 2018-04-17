import React, { Component } from 'react';
import {  
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  Animated,
  TouchableOpacity } from 'react-native';
import {getTimeColor} from '../utils/colors';
import H2 from './text/H2';

export default class TimePicker extends Component {

  constructor(props){
    super(props);
    let initDate = new Date();
    (props.initHours === 0 || !!props.initHours) && initDate.setHours(props.initHours);
    (props.initMinutes === 0 || !!props.initMinutes) && initDate.setMinutes(props.initMinutes);

    this.state = {
      chosenDate: initDate,
      visible: false,
      showTimePicker: false
    };

    this.position = new Animated.ValueXY({x: 0, y: 0});

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        console.log("started", gestureState)
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: Animated.event([
        null, {dx: this.position.x, dy: this.position.y}
      ]),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        this.setState({
          showTimePicker: false
        })
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        console.log(evt)
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        console.log(evt)
        return true;
      },
    });

  }

  setDate = (newDate)  => {
    const { onChange } = this.props;
    this.setState({chosenDate: newDate});
    !!onChange && onChange(newDate.getHours(), newDate.getMinutes())
  } 

  showTimpicker = (evt) => {
    Animated.event([
      {pageX: this.position.x, pageY: this.position.y}
    ])(evt.nativeEvent);

    this.setState({
      showTimePicker: true
   });
  }

  closeModal = () => {
   
  }



  touchToTimePosition = ({x,y}) => {
    
  } 

  render() {
    const {duration, suffix, textStyle} = this.props;
    const {chosenDate, showTimePicker} = this.state;
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
       
         <TouchableOpacity 
         onPressIn={this.showTimpicker}
         >
          <View>
            <Text style={StyleSheet.flatten([styles.timeText, textStyle])} >
              {timeString}
              {!!suffix ? 
                <Text style={StyleSheet.flatten([styles.suffix, textStyle])} >
                {" " + suffix}
                </Text>
              : null}
              
            </Text>
          </View>
        </TouchableOpacity>
        <Modal
        transparent={true}
        visible={showTimePicker}
        >
     
        <View
        {...this._panResponder.panHandlers}
        style={styles.touchface} 
        />
           
           <Animated.View 
           style={
            {
            height: 80,
            width: 80,
            backgroundColor: "#fff",
            position: "absolute", top: 0, left: 0,
            transform: [
              {translateY: this.position.y},
              {translateX: this.position.x}
            ]
            }
          }>
          >
          <H2 dark>Time</H2>
        </Animated.View>

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
    color: getTimeColor(true),
    fontSize: 26,
    fontFamily: 'AvenirNext-Medium',
  },
  suffix:{
    color: getTimeColor(true),
    fontSize: 16,
    fontFamily: 'AvenirNext-Medium',
  },
  touchface:{
    position:"absolute",
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: "rgba(0,0,0,0.7)"
  }
});