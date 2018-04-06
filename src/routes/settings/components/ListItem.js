import React, { Component  } from 'react';
import {  View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import arrow from '../../../assets/images/arrow.png';
import Link from '../../../components/text/Link'

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
  }
});

export default class componentName extends Component {
  render() {
    const {onPress, label, showArrow} = this.props;

    return (
      <TouchableOpacity
      onPress={onPress}
      style={styles.cell}>
       <Link style={styles.cellLabel}>{label}</Link>
       {showArrow ?
        <Image 
        transform={[{
         rotate: '180deg'
        }]}
        source={arrow} />
        : null}
      </TouchableOpacity>
    );
  }
}
