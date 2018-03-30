const state = {
  settings:{
    onboarded: false,
    days: [monday, tusday],
    latest: {
      weekends: {h: 10, m: 0}, 
      weekdays: {h: 10, m: 0}
    },
    calendar: true,
    transit: true,
    transportationMethod: 'car',
    reports:[
      'calendar',
      'news',
      'weather'
    ],
    speech: true,
    sound: {
      type: 'playlist',
      playlistID: 1123,
      file: 'birds.mp3',
      fadeIn: 20, // in minutes
    },
  },
}