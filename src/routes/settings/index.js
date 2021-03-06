import React, { Component } from 'react';
import { View, Text, FlatList, StatusBar, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { StackNavigator } from 'react-navigation';
import NavigationService from '../../services/NavigationService';
import Napping from './routes/Napping';
import Sleeping from './routes/Sleeping';
import Sound from './routes/Sound';
import Support from './routes/Support'
import Speech from './routes/Speech'
import Reports from './routes/Reports'
import Transit from './routes/Transit'
import Calendar from './routes/Calendar'
import Link from '../../components/text/Link'
import ListItem from './components/ListItem';
import arrow from '../../assets/images/arrow.png';

const styles = StyleSheet.create({
  footerText:{
    color: '#9B9B9B',
    textAlign: 'center',
    width: '100%',
    lineHeight: 100,
    height: 100,
  }
});

let navigatorRef = null;

class Header extends Component {
  render() {
    const {navigation} = this.props;
    
    return (
      <View 
      style={{height: 64, backgroundColor: '#F9F9F9'}}
      >
        <TouchableOpacity 
        onPress={()=>{
          if(navigation.state.index === 0){
            NavigationService.goBack()
          }else{
            NavigationService.goBack(navigatorRef)
          }
        }}
        style={{zIndex: 10, height: 42, marginTop: 20, justifyContent: 'center', alignItems: 'center', width: 40}}>
          <Image source={arrow} />
        </TouchableOpacity>
        
        <Link style={{position: 'absolute', width: '100%', textAlign: 'center', marginTop: 32, color: '#9B9B9B'}}>
        SETTINGS</Link>
      </View>
    );
  }
}

class Menu extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <View style={{backgroundColor: "#FFF"}}>
        <StatusBar
          barStyle="dark-content"
        />
      <FlatList
        style={{zIndex: 1}}
        data={[
          {label: 'Sleeping', route: 'Sleeping'},
          {label: 'Napping', route: 'Napping'},
          {label: 'Calendar', route: 'Calendar'},
          {label: 'Transit', route: 'Transit'},
          {label: 'Sound', route: 'Sound'},
          {label: 'Reports', route: 'Reports'},
          {label: 'Speech', route: 'Speech'},
          {label: 'Support', route: 'Support'},

       
        ]}
        keyExtractor={(item, index) => `settings-item-${index}`}
        renderItem={({item}) => 
          <ListItem 
          showArrow={true}
          onPress={()=>navigation.navigate(item.route)}
          label={item.label}
          />
        }
        ListFooterComponent={
          <Link style={styles.footerText}>
            Version 1.0.0
          </Link>
        }
      />
      
      </View>
    );
  }
}

const Navigator = StackNavigator({
  "Menu": { screen: Menu },
  "Transit": {screen: Transit},
  "Napping": {screen: Napping},
  "Sleeping": {screen: Sleeping},
  "Sound": {screen: Sound},
  "Calendar": {screen: Calendar},
  "Support": {screen: Support},
  "Reports": {screen: Reports},
  "Speech" : {screen: Speech},
},
{
  initialRouteName: 'Menu',
  navigationOptions: ({ navigation }) => ({
    header: props => <Header {...props}   />,
  }),
  cardStyle:{
    backgroundColor: "#fff"
  }
}); 


class index extends Component {
  render() {
    return (
      <Navigator
        ref={ref => {
          navigatorRef = ref
        }}
      />
    );
  }
}

export default index;




