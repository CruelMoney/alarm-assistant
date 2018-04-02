import        { connect          } from 'react-redux' ;
import React, { Component        } from 'react'       ;
import        { View     , Text, } from 'react-native';


const connectServices = (wrapee) => {
  class Wrapper extends Component {
    componentDidMount(){
      const {calendar, calendars, transit, transportationMethod} = this.props;

      // fetch calendar if enabled

      // fetch transit if enabled
      // calculate alarm time
      // calculate nap time
      
      // save all in state
    }

    getText = (mode) => {
      // use state to get the text to be shown
      // and expose this method in wrappee
    }

    render() {
      return (
        <View>
          <Text> textInComponent </Text>
        </View>
      );
    }
  }

  const stateToProps = (state) => { return {...state.settings} }
  const dispatchToProps = (dispatch) => { 
    return {

    } 
  }

  return connect(stateToProps, dispatchToProps)(Wrapper);

}

export default connectServices;