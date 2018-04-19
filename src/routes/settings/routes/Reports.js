import React, { Component } from 'react';
import {  View, Text, StyleSheet, ScrollView } from 'react-native';
import connectSettings from '../../../containers/settings';
import H2 from '../../../components/text/H2';
import Body from '../../../components/text/Body';
import Span from '../../../components/text/Span';
import {getTimeColor} from '../../../utils/colors';
import { askLocationPermission } from '../../../services/TransitService';
import YesNo from '../../../components/YesNo';


const styles = StyleSheet.create({
  headline:{
    color: '#9B9B9B',
    marginTop: 15,
  },
  text:{
    color: '#9B9B9B',
  },
  section:{
    justifyContent: "center",
    alignItems: 'center',
    marginBottom: 20,
  }
});


class Index extends Component {

  changeReports = (include, name) => {
    let { changeSetting, reports } = this.props;
    const exists = reports.includes(name);
    if(!exists && include){
      reports.push(name);
    }else if(!include){
      reports = reports.filter(v => v !== name);
    }
    changeSetting('reports', reports);
  }
  
  render() {
    const { 
      reports
    } = this.props;

    const calendar = reports.includes('calendar');
    const weather = reports.includes('weather');
    const news = reports.includes('news');

    return (
      <ScrollView>
        <View style={styles.section}>
          <H2 style={styles.headline}>
          Today’s weather report
          </H2>
          <Body style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <YesNo 
          inverted
          controlled={true}
          value={weather}
          onChange={val=>this.changeReports(val, 'weather')}
          />
        </View>
        <View style={styles.section}>
          <H2 style={styles.headline}>
          Latest news report
          </H2>
          <Body style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <YesNo 
          inverted
          controlled={true}
          value={news}
          onChange={val=>this.changeReports(val, 'news')}
          />
        </View>
        <View style={styles.section}>
          <H2 style={styles.headline}>
          Calendar report
          </H2>
          <Body style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <YesNo 
          inverted
          controlled={true}
          value={calendar}
          onChange={val=>this.changeReports(val, 'calendar')}
          />
        </View>
      </ScrollView>
    );
  }
}


export default connectSettings(Index);
