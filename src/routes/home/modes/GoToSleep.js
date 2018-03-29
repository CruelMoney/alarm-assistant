import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import Layout from './Layout';
import MyButton from '../Button';

export default class Index extends Component {
  

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Layout
        containerStyle={styles.container}
        menu={
          <View style={{width:'100%'}}>
            <MyButton 
              label={"SLEEP"} 
              style={{backgroundColor: '#F29160'}} />
              <MyButton 
              onPress={() => navigate('Nap')}
              label={"NAP"} 
              style={{backgroundColor: '#A782D4'}} />
          </View>
        }
      >
         Go to sleep now to get a full <Text style={styles.highlight}>7.5</Text> hours of sleep. Your first event is scheduled at <Text style={styles.highlight}>10:00</Text> tomorrow,  and I will wake you up at <Text style={styles.highlight}>8:00</Text>, with “Morning playlist”.
      </Layout>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    backgroundColor: '#FF9966',
  },
  highlight: {
    color: '#FFCC4C',
  },
});