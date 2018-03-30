import React, { Component } from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import DaysSelector from '../../components/DaysSelector';
import H2 from '../../components/text/H2';
import Body from '../../components/text/Body';
import YesNo from '../../components/YesNo';
import connectSettings from "../../containers/settings";

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

    return (
      <View style={{flex:1, 
        margin: 30,
        marginTop: 40,
        marginBottom: 20,
        flexDirection: "column", 
        justifyContent: "space-between", 
        alignItems:"center"}}>
        <View >
          <H2 style={{color:"#fff"}}>
          Today’s weather report
          </H2>
          <Body style={{color:"#fff", marginBottom: 0}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <YesNo 
          onChange={val=>this.changeReports(val, 'weather')}
          />
        </View>
        <View>
          <H2 style={{color:"#fff"}}>
          Latest news report
          </H2>
          <Body style={{color:"#fff", marginBottom: 0}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <YesNo
          onChange={val=>this.changeReports(val, 'news')}
          />
        </View>
        <View>
          <H2 style={{color:"#fff"}}>
          Calendar report
          </H2>
          <Body style={{color:"#fff", marginBottom: 0}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <YesNo
          onChange={val=>this.changeReports(val, 'calendar')}
          />
        </View> 
      </View>
    );
  }
}


const styles = StyleSheet.create({
  section:{
    margin: 20
  },
  timepickers:{
    flexDirection: 'row',
    justifyContent: "space-around"
  }
});

export default connectSettings(Index);
