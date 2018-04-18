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
import _ from 'lodash';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const pickerWidth = 120;
const touchOffset = 80;
let showingRight = true;

export default class TimePicker extends Component {

  constructor(props){
    super(props);

    this.state = {
      hours: props.initHours,
      minutes: props.initMinutes,
      showTimePicker: false
    };

    this.dTouch = new Animated.ValueXY({x: 0, y: 0});
    this.initPos = new Animated.ValueXY({x: 0, y: 0});
    this.offsetX = new Animated.Value(touchOffset);

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
      onPanResponderMove: (evt, gestureState) => {
        this.animatePickerOffset(gestureState.moveX);
        this.setTimeFromPosition();

        return Animated.event([
          {dx: this.dTouch.x, dy: this.dTouch.y}
        ])(gestureState);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded

        // Reset delta
        this.dTouch = new Animated.ValueXY({x: 0, y: 0});

        this.closeModal();
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
      {pageX: this.initPos.x, pageY: this.initPos.y}
    ])(evt.nativeEvent);

    this.initPos.x = Animated.add(this.initPos.x, new Animated.Value(-(pickerWidth/2)));
    this.initPos.y = Animated.add(this.initPos.y, new Animated.Value(-(pickerWidth/2)));

    this.animatePickerOffset(this.initPos.x.__getValue(), 0)
    this.setState({
      showTimePicker: true
    });
  }

  closeModal = () => {
    this.setState({
      showTimePicker: false
    })
  }


  animatePickerOffset = (xPos, duration) => {
    const anim = (showLeft = true) => {
      const startValue = showLeft ? touchOffset : -touchOffset;
      const endValue = -1*startValue - (showLeft ? pickerWidth : 0);
      return Animated.timing(this.offsetX, { toValue: endValue, duration: duration }).start();
    }

    if(xPos > screenWidth/2){
      if(showingRight){
        showingRight = false;
        anim(true);
      }
    }else if(!showingRight){ // touch left side
      showingRight = true;
      anim(false);
    }
  }

  setTimeFromPosition = () => requestAnimationFrame(() => {
    let minutes = this.dTouch.y.interpolate({
      inputRange: [-screenHeight/2, screenHeight/2],
      outputRange: [0, 24*60],
      extrapolate: "clamp"
    }).__getValue();
   
    let hours   = Math.floor(minutes/60);
    minutes = Math.floor((minutes)%60);
    
    this.setState({
      hours: hours,
      minutes: minutes
    });
  })


  getPickerTransform = () => {
    const maxMoveY = (screenHeight-pickerWidth) - this.initPos.y.__getValue();
    const maxMoveX = (screenWidth-pickerWidth) - this.initPos.x.__getValue();
    const minMoveY = -this.initPos.y.__getValue();
    const minMoveX = -this.initPos.x.__getValue();

    const dx = Animated.diffClamp(this.dTouch.x, minMoveX, maxMoveX);
    const dy = Animated.diffClamp(this.dTouch.y, minMoveY, maxMoveY);

    // add delta move to initial position
    let y = Animated.add(dy, this.initPos.y);
    let x = Animated.add(dx, this.initPos.x);

    // Add offset to show beside finger
    x = Animated.add(x, this.offsetX);

    return [
      {translateY: y},
      {translateX: x}
    ];
  } 

  render() {
    const {duration, suffix, textStyle} = this.props;
    let {hours, minutes, showTimePicker} = this.state;
    
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
            // height: pickerWidth,
            // width: pickerWidth,
            backgroundColor: "transparent",
            position: "absolute", top: 0, left: 0,
            transform: this.getPickerTransform()
            }
          }>
          >
          <View style={styles.pickerSection}>
            <View style={styles.valueText}>
              <Text style={styles.pickerText}>
                {hours}
              </Text>
            </View>
            <View>
              <Text style={styles.unitText}>hours</Text>
            </View>
          </View>
          <View style={styles.pickerSection}>
          <View style={styles.valueText}>
              <Text style={styles.pickerText}>
                {minutes}
              </Text>
            </View>
            <View>
              <Text style={styles.unitText}>minutes</Text>
            </View>
          </View>
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
    height: screenHeight,
    width: screenWidth,
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  pickerText: {
    color: getTimeColor(true),
    fontSize: 46,
    fontFamily: 'AvenirNext-Heavy',
    textAlign: "left"
  },
  unitText:{
    color: getTimeColor(true),
    fontSize: 28,
    fontFamily: 'AvenirNext-Heavy',
    textAlign: "left"
  },
  valueText:{
    width: 80,
    height: 50
  },
  pickerSection:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    
  }
});