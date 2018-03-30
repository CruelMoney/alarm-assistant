import { connect } from 'react-redux';
import { changeSetting } from '../actions';

const stateToProps = (state) => { return {...state.settings} }
const dispatchToProps = (dispatch) => { 
  return {
    changeSetting: (key, value) => dispatch(changeSetting(key, value))
  } 
}

export default (wrapee) => connect(stateToProps, dispatchToProps)(wrapee);