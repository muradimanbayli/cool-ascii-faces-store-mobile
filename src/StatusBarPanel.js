import React, {Component} from 'react';
import {View, StatusBar } from 'react-native';

class StatusBarPanel extends Component {
  render(){
    return(
      <View style={{height:30,backgroundColor:'white'}}>
        <StatusBar barStyle="light-content" />
      </View>
      )
  }
}

export default StatusBarPanel;
