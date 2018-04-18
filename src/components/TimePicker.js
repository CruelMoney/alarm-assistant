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
import { VibrancyView } from 'react-native-blur';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const pickerWidth = 200;
const pickerHeight = 100;
const touchOffset = 80;


export default class TimePicker extends Component {

  constructor(props){
    super(props);

    const {initHours, initMinutes} = this.props;

    const hours   = Math.floor(initMinutes/60) + initHours;
    const minutes = Math.floor(initMinutes)%60;

    this.state = {
      hours: hours,
      minutes: minutes,
      showTimePicker: false
    };

    this.touchRightSide = null;
    this.dTouch = new Animated.ValueXY({x: 0, y: 0});
    this.initPos = new Animated.ValueXY({x: 0, y: 0});

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!

        this.animatePickerOffset({
          touchX: evt.nativeEvent.pageX,
          touchY: evt.nativeEvent.pageY
        })

        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        this.setTimeFromPosition();

        const touchRightSide = evt.nativeEvent.pageX > screenWidth/2;
        if (touchRightSide !== this.touchRightSide){
          this.touchRightSide = touchRightSide ;
          this.flip(touchRightSide, gestureState);
        }

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


  showTimpicker = (evt) => {
    this.animatePickerOffset({
      touchX: evt.nativeEvent.pageX,
      touchY: evt.nativeEvent.pageY
    }, 0);

    this.setState({
      showTimePicker: true
    });
  }

  closeModal = () => {
    const {onChange} = this.props;
    const {hours, minutes} = this.state;
    
    this.setState({
      showTimePicker: false
    });

    !!onChange && onChange(hours, minutes);
  }

  flip = (touchRightSide, gestureState) => {
    const curY = this.initPos.y.__getValue();
    const dx = gestureState.dx;
    const x = (touchRightSide ? -50 : (screenWidth/2 + 50)) - dx;

    return Animated.timing(this.initPos, { toValue: {x:x, y:curY}, duration: 250 }).start();
  }

  animatePickerOffset = ({touchX, touchY}, duration=250) => {
    const touchRightSide = touchX > screenWidth/2;
    this.touchRightSide = touchRightSide;
    const offset = 50;

    const y = touchY - pickerHeight/2;
    const x = touchX + (touchRightSide ? -offset : offset) + (touchRightSide ? -pickerWidth : 0);
    
    return Animated.timing(this.initPos, { toValue: {x:x,y:y}, duration: duration }).start();
  }

  setTimeFromPosition = () => requestAnimationFrame(() => {
    const {initHours, initMinutes} = this.props;

    let minutes = this.dTouch.y.interpolate({
      inputRange: [-screenHeight, 0, screenHeight],
      outputRange: [-12*60, 0, 12*60]
    }).__getValue();
    
    const initialValue = initMinutes + initHours*60;

    minutes = initialValue + minutes;
    minutes = Math.min(24*60-1, minutes);

    let hours   = Math.min(23, Math.max(0, Math.floor(minutes/60)));
    minutes     = Math.min(59, Math.max(0, Math.floor(minutes)%60));
    
    this.setState({
      hours: hours,
      minutes: minutes
    });
  })


  getPickerTransform = () => {
    // add delta move to initial position
    let y = Animated.add(this.dTouch.y, this.initPos.y);
    let x = Animated.add(this.dTouch.x, this.initPos.x);
    x = Animated.diffClamp(x, 0, screenWidth-pickerWidth);
    y = Animated.diffClamp(y, 0, screenHeight-pickerHeight);

    return [
      {translateY: y},
      {translateX: x}
    ];
  } 

  render() {
    const {duration, suffix, textStyle, initHours, initMinutes, colored} = this.props;
    let {hours, minutes, showTimePicker} = this.state;
    
    if(!duration){
      hours = String(hours).length < 2 ? ("0"+hours) :hours;
    }
    minutes = String(minutes).length < 2 ? ("0"+minutes) : minutes;

    const delimiter = ':';
    const timeString = `${hours}${delimiter}${minutes}`;
    const propsTime =  `${initHours}${delimiter}${initMinutes}`;

    const styles = getStyle(colored);

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
        animationType="fade"
        >

            <VibrancyView
            style={styles.absolute}
            viewRef={this.state.viewRef}
            blurType="dark"
            blurAmount={10}
            />
        
           <Animated.View 
           style={
            {
            backgroundColor: "transparent",
            position: "absolute", top: 0, left: 0,
            transform: this.getPickerTransform()
            }
          }>
          >
          
          {duration ? 
          <View>
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
          </View>
            :
            <Text style={styles.pickerText}>
                {timeString}
            </Text>
            }
        </Animated.View>

  
        <View
        {...this._panResponder.panHandlers}
        style={styles.touchface} 
        />
        
        </Modal>
      </View>
    );
  }
}


const getStyle = (colored) => {
  const color = colored ? getTimeColor(true) : "#fff";
  return StyleSheet.create({
      slideContainer:{
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.8)"
      },
      timeText:{
        color: color,
        fontSize: 26,
        fontFamily: 'AvenirNext-Medium',
      },
      suffix:{
        color: color,
        fontSize: 16,
        fontFamily: 'AvenirNext-Medium',
      },
      touchface:{
        position:"absolute",
        top: 0,
        left: 0,
        height: screenHeight,
        width: screenWidth,
        backgroundColor: "transparent"
      },
      pickerText: {
        color: color,
        fontSize: 46,
        fontFamily: 'AvenirNext-Heavy',
        textAlign: "left"
      },
      unitText:{
        color: color,
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
      },
      absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
      },
    });
}