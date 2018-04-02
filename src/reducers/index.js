import { actionTypes } from '../actions';

const initialState = {
  settings:{
    onboarded: false,
    days: [],
    latestWeekends: {h: 10, m: 0}, 
    latestWeekdays: {h: 12, m: 0},
    sleepLengthWeekends: 450,
    sleepLengthWeekdays: 540,
    calendar: true,
    transit: true,
    transportationMethod: 'car',
    calendars: [],
    reports:[
      'calendar',
      'news',
      'weather'
    ],
    speech: true,
    soundType: 'sound',
    soundFile: 'birds.mp3',
    playlistID: 0,
    fadeIn: 15, // in minutes
  },
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SETTING:
      return {
        ...state,
        settings:{
          ...state.settings,
          [action.key]: action.value
        }
      }
    default:
      return state
  }
}

export default reducer;