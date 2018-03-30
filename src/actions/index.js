const CHANGE_SETTING = 'CHANGE_SETTING';

const actionTypes = {
  CHANGE_SETTING
}

const changeSetting = (key, value) => {
  return { 
    type: CHANGE_SETTING, 
    key, 
    value
  }
}

export {
  actionTypes,
  changeSetting
};
