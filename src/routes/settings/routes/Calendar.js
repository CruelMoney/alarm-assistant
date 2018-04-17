import React, { Component } from 'react';
import {  View, Text, StyleSheet, ScrollView } from 'react-native';
import connectSettings from '../../../containers/settings';
import H2 from '../../../components/text/H2';
import Body from '../../../components/text/Body';
import { askCalendarPermission, getCalendars } from '../../../services/CalendarService';
import {getTimeColor} from '../../../utils/colors';
import YesNo from '../../../components/YesNo';
import ListItem from '../components/ListItem';
import CheckBox from '../../../components/CheckBox';


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
  },
  calendars:{
    zIndex: 1, 
    width: "100%",
    marginTop: 10,
    borderTopColor: '#eee',
    borderTopWidth: 1,
  }
});




class Index extends Component {

  constructor(props){
    super(props);
    const {calendar} = this.props;
    
    this.state = {
      useCalendar: calendar,
      calendars: []
    }
  }

  updateCalendars = async () => {
    const {calendars} = this.props;
    try {
      const deviceCalendars = await getCalendars();
      const renderCalendars = deviceCalendars.map(c => {
        return{
          id: c.id,
          title: c.title,
          active: calendars.includes(c.id)
        }
      });
      this.setState({
        calendars: renderCalendars
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
   this.updateCalendars()
  }


  useCalendar = async (val) => {
    const { changeSetting } = this.props;
    let granted = val;
    if(val){
      granted = await askCalendarPermission();
    }
    changeSetting('calendar', granted);
    this.setState({useCalendar: granted});
  }

  toggleCalendar = (id) =>{
    const {changeSetting} = this.props;
    const newCals = this.state.calendars.reduce((acc, c)=>{
      return [
        ...acc,
        {...c, active: c.id === id ? !c.active : c.active}
      ]
    }, []);
    this.setState({
      calendars:newCals
    });
    changeSetting('calendars', newCals.filter(c=>c.active).map(c=>c.id));
  } 

  render() {
    const {useCalendar, calendars} = this.state;
    const color = getTimeColor(true);

    return (
      <ScrollView style={{backgroundColor: "#FFF"}}>
        <View style={styles.section}>
          <H2 style={styles.headline}>
            Use calendar
          </H2>
          <Body style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <YesNo
          inverted
          controlled={true}
          value={useCalendar}
          onChange={this.useCalendar}/>
        </View>
        <View style={StyleSheet.flatten([styles.section, {opacity: useCalendar ? 1 : 0.5}])}>
          <H2 style={styles.headline}>
            Active calendars
          </H2>
          <Body style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body>
          <View
            style={styles.calendars}
          >
            {calendars.map((item, idx)=>{
              return (
              <ListItem 
              style={{height: 60}}
              key={`calendar-item-${idx}`}
              showArrow={false}
              onPress={_ => useCalendar && this.toggleCalendar(item.id)}
              label={item.title}
              >
               <CheckBox 
                active={item.active}
                />
              </ListItem>
              )
          })}
          </View>
        </View>
      </ScrollView>
    );
  }
}


export default connectSettings(Index);
