import moment from 'moment';

/**
 * @param  {} {alarmTime
 * @param  {} minSleepMinutes
 * @param  {} latestWakeupH
 * @param  {} latestWakeupM}
 * @return {} the moment of the alarm 
 */
const calculateNextAlarmTime = ({
  alarmTime, // as determined by other factors as events, can be null
  minSleepMinutes, 
  latestWakeupH,
  latestWakeupM
}, now) => {
  // approach calculate all possible alarms and use the earliest 
  now = !!now ? now : moment();
  const alarm = !!alarmTime ? moment(alarmTime) : moment().add(999, 'day');
  const minimum = moment(now).add(minSleepMinutes, 'minute');
  let latest = moment(now).hour(latestWakeupH).minute(latestWakeupM);
  latest < now && latest.add(1, 'day');

  const firstAlarm = moment.min([alarm, minimum, latest]);
  const mode = 
    firstAlarm === alarm ? "event" :
    firstAlarm === minimum ? "minimum" :
    firstAlarm === minimum ? "latest" : 'unknown';
  return {
    firstAlarm,
    mode
  };
}


const setAlarm = (at, alarmAction) => {
  const timeout = at.diff(moment(), 'milliseconds');
  if(timeout < 0 ) throw Error("Can't set alarm in present");
  return setTimeout(alarmAction, timeout);
}


export {
  calculateNextAlarmTime,
  setAlarm
}
