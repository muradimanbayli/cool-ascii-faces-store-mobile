import React, {Component} from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { formatCurrency, formatDate } from './utils';

class Product extends Component {
  render(){
    const { face, size, id, date, price } = this.props ;
    return(
      <View style={{flex:1, borderWidth: 1, margin: 1, padding: 3, borderColor: '#DDD',borderRadius: 2}}>
        <Text style={{fontSize: 23}}> {face} </Text>
        <Text>Size : {size} </Text>
        <Text>Id : {id} </Text>
        <Text>Price : {formatCurrency(price)} </Text>
        <Text>Date : {formatDate(date)} </Text>
      </View>
      )
  }
}

export default Product;
