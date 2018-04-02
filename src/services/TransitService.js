import Permissions from 'react-native-permissions';
import {alertForPermission} from '../utils/permissions';

const askLocationPermission = async () => {
  return new Promise(async (resolve, reject)=>{
    const locationPermissionState =  await Permissions.check('location');
    if(locationPermissionState !== 'authorized'){
      alertForPermission({
        title: 'Can I access your location?',
        desc:  'I need you location to calculate the transit time',
        state: locationPermissionState,
        cb: async () => {
          const status = await Permissions.request('location');
          if(status === 'authorized'){
            resolve(true);
          }else{
            reject('Could not activate location')
          }
        },
        cbDeny: () => reject('Could not activate location')
      });
    }else{
      resolve(true)
    }
  });
}

const getTransitTime = async ({to, method}) => {
  return 0;
}

export {
  askLocationPermission,
  getTransitTime
}