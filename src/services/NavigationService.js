import { NavigationActions } from 'react-navigation';

let _navigator;
let _onboardNavigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}
function setOnboardNavigator(navigatorRef) {
  _onboardNavigator = navigatorRef;
}

function navigateGeneric(routeName, params, navigator) {
  navigator.dispatch(
    NavigationActions.navigate({
      type: NavigationActions.NAVIGATE,
      routeName,
      params,
    })
  );
}

function navigate(routeName, params){
  navigateGeneric(routeName, params, _navigator);
}

function navigateOnboard(routeName, params){
  navigateGeneric(routeName, params, _onboardNavigator);
}


function goBack(navigator){
  navigator = navigator || _navigator

  navigator.dispatch(
    NavigationActions.back({
      type: NavigationActions.BACK
    })
  );
}



// add other navigation functions that you need and export them

export default {
  navigate,
  navigateOnboard,
  setTopLevelNavigator,
  setOnboardNavigator,
  goBack
};