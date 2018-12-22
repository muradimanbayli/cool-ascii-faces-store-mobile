import React, {Component} from 'react';
import {View, Image } from 'react-native';

class Ad extends Component {
  render(){
    let adUrl = 'http://localhost:3000/ads/?r=' + Math.floor(Math.random()*1000);
    return(
      <View style={{flex:1, borderWidth: 1, margin: 1, padding: 3, borderColor: '#DDD',borderRadius: 2}}>
        <Image
         style={{height: 100}}
         source={{uri: adUrl}}
       />
      </View>
      )
  }
}

export default Ad;
