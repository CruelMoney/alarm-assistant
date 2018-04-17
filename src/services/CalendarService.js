import RNCalendarEvents from 'react-native-calendar-events';
import Permissions from 'react-native-permissions';
import { alertForPermission } from '../utils/permissions';
 
const _granted = async () => {
  return await Permissions.check('event');
}

const askCalendarPermission = async () => {
  return new Promise(async (resolve, reject)=>{
    const calendarPermissionState = await _granted();
    if(calendarPermissionState !== 'authorized'){
      alertForPermission({
        title: 'Can I access your calendar?',
        desc:  'I need access to create alarms automatically',
        state: calendarPermissionState,
        cb: async () => {
          const status = await Permissions.request('event');
          if(status === 'authorized'){
            resolve(true);
          }else{
            reject('Could not activate calendar')
          }
        },
        cbDeny: () => reject('Could not activate calendar')
      });
    }else{
      resolve(true)
    }
  });
}

const _addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const getNextEvent = async (calendarIDs = []) => {
  return new Promise(async (resolve, reject) => {
    const calendarPermissionState = await _granted();
    const startDate = new Date();
    const endDate = _addDays(startDate, 1);
     
    if(calendarPermissionState){
      try {
        const events = await RNCalendarEvents.fetchAllEvents(
          startDate, 
          endDate, 
          calendarIDs
        );
        const event = events.reduce((firstEvent, e)=>{
          if(new Date(e.startDate) < startDate) return firstEvent;
          if(!firstEvent) return e;
          return (new Date(firstEvent.startDate) < new Date(e.startDate)) ? firstEvent : e;
        }, null)
        resolve(event);
      } catch (error) {
        reject(error);
      }
    }else{
      reject('Permission not granted');
    }
  });
}

getCalendars = RNCalendarEvents.findCalendars;

export {
  askCalendarPermission,
  getNextEvent,
  getCalendars
}