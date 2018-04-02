import { Alert } from 'react-native';
import Permissions from 'react-native-permissions';

const alertForPermission = ({title, desc, state, cb, cbDeny}) => {
  Alert.alert(
    title,
    desc,
    [
      {
        text: 'No',
        onPress: cbDeny,
        style: 'cancel',
      },
      state == 'undetermined'
        ? { text: 'OK', onPress: cb }
        : { text: 'Open Settings', onPress: Permissions.openSettings },
    ],
  )
}



export {
  alertForPermission
}