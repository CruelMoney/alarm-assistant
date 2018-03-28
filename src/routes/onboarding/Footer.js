import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Link from '../../components/text/Link';
import NavigationService from '../../services/NavigationService';

const styles = StyleSheet.create({
  button:{
    flex:1,
    marginLeft: 5,
    marginRight: 5,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class Footer extends Component {
  
  next = () => {
    const {activeStep} = this.props;
    NavigationService.navigateOnboard(String(activeStep+1));
  }

  finish = () => {
    console.log("finish")
    NavigationService.navigate('Home');
  }

  back = () => {
    const {activeStep} = this.props;
    NavigationService.navigateOnboard(String(activeStep-1));
  }

  render() {
    const {activeStep} = this.props;

    return (
      <View style={{
        alignSelf: "stretch", 
        justifyContent:"space-between", 
        flexDirection: "row",
        alignItems:"center", 
        height: 70, 
        backgroundColor: "rgba(0,0,0,0.05)"}}>
        {activeStep !== 1 ? 
        <TouchableOpacity onPress={this.back} style={styles.button}>
          <Link>BACK</Link>
        </TouchableOpacity> 
        : <View style={styles.button}/> }
        <ProgressStatus 
          activeStep={activeStep}
          steps={4}
        />
         {
           activeStep !== 4 
           ? <TouchableOpacity 
           style={styles.button}
           onPress={this.next}>
              <Link>NEXT</Link>
            </TouchableOpacity> 
           : <TouchableOpacity onPress={this.finish} style={styles.button}>
             <Link>FINISH</Link>
             </TouchableOpacity>
          }
      </View>
    );
  }
}

export default Footer;


class ProgressStatus extends Component {
  render() {
    const { activeStep, steps } = this.props;
    const stepsArr = Array.apply(null, Array(steps)).map((val, idx) => idx);
  
    return (
      <View style={{
        flex: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {stepsArr.map((_, idx) => {
          const active = idx+1 === activeStep;
          return( 
            <View 
            key={`progress-${idx}`}
            style={{
              width: active ? 12 : 8,
              height: active ? 12 : 8,
              borderRadius: 12,
              opacity: active ? 1 : 0.5,
              margin: 6,
              backgroundColor: "#fff",
              shadowColor: "#fff",
              shadowOpacity: active ? 1 : 0,
              shadowOffset: {width: 0,height: 0},
              shadowRadius: 4
            }} />
           )
        })}
      </View>
    );
  }
}

