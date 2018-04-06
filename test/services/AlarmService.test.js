import * as _as from '../../src/services/AlarmService';
import moment from 'moment';

test('Alarm uses latest', () => {
  const now = moment().hour(23).minute(0).day(1);

  const {firstAlarm} =
    _as.calculateNextAlarmTime({
      alarmTime: moment(now).add(2, 'day'),
      latestWakeupH: 10,
      latestWakeupM: 30,
      minSleepMinutes: 24*60
    }, now);

  expect(firstAlarm.day()).toBe(2);
  expect(firstAlarm.hour()).toBe(10);
  expect(firstAlarm.minute()).toBe(30);
});

test('Alarm latest same day', () => {
  const now = moment().hour(2).minute(0).day(1);;

  const {firstAlarm} =
    _as.calculateNextAlarmTime({
      alarmTime: moment(now).add(2, 'day'),
      latestWakeupH: 10,
      latestWakeupM: 30,
      minSleepMinutes: 24*60
    }, now);

  expect(firstAlarm.day()).toBe(1);
  expect(firstAlarm.hour()).toBe(10);
  expect(firstAlarm.minute()).toBe(30);
});


test('Alarm minSleep', () => {
  const now = moment().hour(23).minute(0).day(1);;

  const {firstAlarm} =
    _as.calculateNextAlarmTime({
      alarmTime: moment(now).add(2, 'day'),
      latestWakeupH: 10,
      latestWakeupM: 30,
      minSleepMinutes: 7.5*60
    }, now);

  expect(firstAlarm.day()).toBe(2);
  expect(firstAlarm.hour()).toBe(6);
  expect(firstAlarm.minute()).toBe(30);
});


test('Alarm use alarmTime', () => {
  const now = moment().hour(23).minute(0).day(1);;

  const {firstAlarm} =
    _as.calculateNextAlarmTime({
      alarmTime: moment(now).add(6, 'hour'),
      latestWakeupH: 10,
      latestWakeupM: 30,
      minSleepMinutes: 7.5*60
    }, now);

  expect(firstAlarm.day()).toBe(2);
  expect(firstAlarm.hour()).toBe(5);
  expect(firstAlarm.minute()).toBe(0);
});

test('Alarm before now error', () => {
  const at = moment().subtract(1, 'day');
  const alarmAction = () => console.log("ALARM");
  expect(() => {
    const res = _as.setAlarm(at, alarmAction);
  }).toThrowError("Can't set alarm in present");

});

test('Alarm does not throw', () => {
  const at = moment().add(1, 'day');
  const alarmAction = () => console.log("ALARM");
  expect(_as.setAlarm(at, alarmAction)).toBeDefined();
});