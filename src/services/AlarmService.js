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
  // approach calcualte all possible alarms and take the first one
  now = !!now ? now : moment();
  const alarm = !!alarmTime ? moment(alarmTime) : false;
  const minimum = moment(now).add(minSleepMinutes, 'minute');
  let latest = moment(now).hour(latestWakeupH).minute(latestWakeupM);
  latest < now && latest.add(1, 'day');

  const firstAlarm = moment.min([alarm, minimum, latest]);

  return firstAlarm;
}


export {
  calculateNextAlarmTime
}
