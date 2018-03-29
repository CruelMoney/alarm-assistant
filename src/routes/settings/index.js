import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import NavigationService from '../../services/NavigationService';
import Alarm from './routes/Alarm';
import Support from './routes/Support'
import Transit from './routes/Transit'
import Link from '../../components/text/Link'
import arrow from '../../assets/images/arrow.png';

class Header extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <View 
      style={{height: 64, backgroundColor: '#F8F8F8'}}
      >
        <TouchableOpacity 
        onPress={NavigationService.goBack}
        style={{height: 42, marginTop: 20, justifyContent: 'center', alignItems: 'center', width: 40}}>
          <Image source={arrow} />
        </TouchableOpacity>
        
        <Link style={{position: 'absolute', width: '100%', textAlign: 'center', marginTop: 32, color: '#9B9B9B'}}>SETTINGS</Link>
      </View>
    );
  }
}

class Menu extends Component {
  render() {
    return (
      <FlatList
        data={[{key: 'a'}, {key: 'b'}]}
        renderItem={({item}) => <Text>{item.key}</Text>}
      />
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
    header: props => <Header {...props} />,
  }),
}); 


class index extends Component {
  render() {
    return (
      <Navigator />
    );
  }
}

export default index;




