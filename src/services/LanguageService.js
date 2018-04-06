import moment from 'moment';

 const getSleepText = ({ alarmTime, loading, mode, soundName }) => {
  if(loading || !alarmTime) return `Loading`;
  const sleepLength = Math.round(alarmTime.diff(moment(), 'minute')/60, 1);
  switch (mode) {
    case 'event':
      return `Go to sleep now to get ${sleepLength} hours of sleep. I will wake you up at ${alarmTime.format('HH:mm')}, with ${soundName}.`
    case 'latest':
      return `Go to sleep now to get ${sleepLength} hours of sleep. I will wake you up at ${alarmTime.format('HH:mm')}, with ${soundName}.`
    case 'minimum':
      return `Go to sleep now to get a full ${sleepLength} hours of sleep. I will wake you up at ${alarmTime.format('HH:mm')}, with ${soundName}.`
    default:
      return `Go to sleep now to get ${sleepLength} hours of sleep. I will wake you up at ${alarmTime.format('HH:mm')}, with ${soundName}.`
  }
}

const getNapText = ({ napAlarm, maxNap, loading, napMode, event, soundName }) => {
  if(loading || !napAlarm) return `Loading`;
  let sleepLength = Math.round(napAlarm.diff(moment(), 'second')/60, 1);
  const maxSleepLength = Math.round(maxNap.diff(moment(), 'second')/60, 1);
  switch (napMode) {
    case 'event':
      return `You can ${sleepLength < 10 ? 'only' :  ''} nap for ${sleepLength} minutes, before you have to go to ${event.name}, starting at ${event.startDate.format('HH:mm')}.`
    case 'minimum':
      return `I'll wake you after ${sleepLength} minutes. You could nap for ${maxSleepLength} minutes, until you have an event, ${event.name}, starting at ${event.startDate.format('HH:mm')}.`
    case 'minimum-no-event':
      return `Nap now for ${sleepLength} minutes. You don't have anything coming up in your calendar, but I'll wake you at ${napAlarm.format('HH:mm')}.`
    default:
      return `Nap now for ${sleepLength} minutes.`
  }
}

export{
  getSleepText,
  getNapText
}