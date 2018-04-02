import RNCalendarEvents from 'react-native-calendar-events';
import Permissions from 'react-native-permissions';
import {alertForPermission} from '../utils/permissions';

const askCalendarPermission = async () => {
  return new Promise(async (resolve, reject)=>{
    const calendarPermissionState =  await Permissions.check('event');
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

const getNextEvent = () => {
  throw new Error('Not implemented');
}


export {
  askCalendarPermission,
  getNextEvent
}