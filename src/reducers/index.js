import { actionTypes } from '../actions';

const initialState = {
  settings:{
    onboarded: false,
    days: [],
    latestWeekends: {h: 12, m: 0}, 
    latestWeekdays: {h: 10, m: 0},
    sleepLengthWeekends: 540,
    sleepLengthWeekdays: 450,
    napLength: 0.1, 
    calendar: true,
    transit: true,
    transportationMethod: 'car',
    preparationTime: 60, // in minutes
    calendars: [],
    reports:[
      'calendar',
      'news',
      'weather'
    ],
    speech: true,
    soundType: 'sound',
    soundFile: 'birds_chirps.mp3',
    soundName: 'Bird Chirps',
    fadeIn: 1*60*60*100, // in ms
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