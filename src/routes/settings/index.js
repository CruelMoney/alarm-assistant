import React, { Component } from 'react';
import { View, Text, FlatList, StatusBar, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { StackNavigator } from 'react-navigation';
import NavigationService from '../../services/NavigationService';
import Alarm from './routes/Alarm';
import Support from './routes/Support'
import Transit from './routes/Transit'
import Link from '../../components/text/Link'
import arrow from '../../assets/images/arrow.png';

const styles = StyleSheet.create({
  cell:{
    height: 100,
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  cellLabel:{
    color: '#9B9B9B',
    textAlign: 'left'
  },
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
      style={{height: 64, backgroundColor: '#F8F8F8'}}
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
      <View>
        <StatusBar
          barStyle="dark-content"
        />
      <FlatList
        style={{zIndex: 1}}
        data={[
          {label: 'Alarm', route: 'Alarm'}, 
          {label: 'Transit', route: 'Transit'},
          {label: 'Support', route: 'Support'},
          {label: 'Morning reports', route: 'Support'},
          {label: 'Speech', route: 'Support'},
          {label: 'Support', route: 'Support'},
          {label: 'Morning reports', route: 'Support'},
          {label: 'Speech', route: 'Support'},
        ]}
        keyExtractor={(item, index) => `settings-item-${index}`}
        renderItem={({item}) => 
        <TouchableOpacity
        onPress={()=>navigation.navigate(item.route)}
        style={styles.cell}>
         <Link style={styles.cellLabel}>{item.label}</Link>
         <Image 
         transform={[{
          rotate: '180deg'
         }]}
         source={arrow} />
        </TouchableOpacity>
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
  "Alarm": { screen: Alarm },
  "Transit": {screen: Transit},
  "Support": {screen: Support}
},
{
  initialRouteName: 'Menu',
  navigationOptions: ({ navigation }) => ({
    header: props => <Header {...props}   />,
  }),
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




