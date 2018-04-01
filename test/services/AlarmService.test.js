import * as _as from '../../src/services/AlarmService';
import moment from 'moment';

test('Alarm uses latest', () => {
  const now = moment().hour(23).minute(0).day(1);

  const res =
    _as.calculateNextAlarmTime({
      alarmTime: moment(now).add(2, 'day'),
      latestWakeupH: 10,
      latestWakeupM: 30,
      minSleepMinutes: 24*60
    }, now);

  expect(res.day()).toBe(2);
  expect(res.hour()).toBe(10);
  expect(res.minute()).toBe(30);
});

test('Alarm latest same day', () => {
  const now = moment().hour(2).minute(0).day(1);;

  const res =
    _as.calculateNextAlarmTime({
      alarmTime: moment(now).add(2, 'day'),
      latestWakeupH: 10,
      latestWakeupM: 30,
      minSleepMinutes: 24*60
    }, now);

  expect(res.day()).toBe(1);
  expect(res.hour()).toBe(10);
  expect(res.minute()).toBe(30);
});


test('Alarm minSleep', () => {
  const now = moment().hour(23).minute(0).day(1);;

  const res =
    _as.calculateNextAlarmTime({
      alarmTime: moment(now).add(2, 'day'),
      latestWakeupH: 10,
      latestWakeupM: 30,
      minSleepMinutes: 7.5*60
    }, now);

  expect(res.day()).toBe(2);
  expect(res.hour()).toBe(6);
  expect(res.minute()).toBe(30);
});


test('Alarm use alarmTime', () => {
  const now = moment().hour(23).minute(0).day(1);;

  const res =
    _as.calculateNextAlarmTime({
      alarmTime: moment(now).add(6, 'hour'),
      latestWakeupH: 10,
      latestWakeupM: 30,
      minSleepMinutes: 7.5*60
    }, now);

  expect(res.day()).toBe(2);
  expect(res.hour()).toBe(5);
  expect(res.minute()).toBe(0);
});

