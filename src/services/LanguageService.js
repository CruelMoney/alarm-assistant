import moment from 'moment';

 const getSleepText = ({ alarmTime, loading, mode, soundName, event }) => {
  if(loading || !alarmTime) return `Loading`;
  let sleepLength = alarmTime.fromNow(true);
  switch (mode) {
    case 'event':
      return `Go to sleep now to get ${sleepLength} of sleep. I will wake you up at ${alarmTime.format('HH:mm')}, for the event, ${event.title}, starting at ${moment(event.startDate).format('HH:mm')}.`
    case 'latest':
      return `Go to sleep now to get ${sleepLength} of sleep. I will wake you up at ${alarmTime.format('HH:mm')}, with ${soundName}.`
    case 'minimum':
      return `Go to sleep now to get a full ${sleepLength} of sleep. I will wake you up at ${alarmTime.format('HH:mm')}, with ${soundName}.`
    default:
      return `Go to sleep now to get ${sleepLength} of sleep. I will wake you up at ${alarmTime.format('HH:mm')}, with ${soundName}.`
  }
}

const getNapText = ({ napAlarm, maxNap, loading, napMode, event, soundName }) => {
  if(loading || !napAlarm) return `Loading`;
  let sleepLength = napAlarm.fromNow(true);
  const maxSleepLength = maxNap.fromNow(true);
  switch (napMode) {
    case 'event':
      return `You can ${sleepLength < 10 ? 'only' :  ''} nap for ${sleepLength}, before you have to go to ${event.title}, starting at ${moment(event.startDate).format('HH:mm')}.`
    case 'minimum':
      return `I'll wake you in ${sleepLength}. You could nap for ${maxSleepLength}, until you have an event, ${event.title}, starting at  ${moment(event.startDate).format('HH:mm')}.`
    case 'minimum-no-event':
      return `Nap now for ${sleepLength}. You don't have anything coming up in your calendar, but I'll wake you at ${napAlarm.format('HH:mm')}.`
    default:
      return `Nap now for ${sleepLength}.`
  }
}

export{
  getSleepText,
  getNapText
}