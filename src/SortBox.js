import React, {Component} from 'react';
import {StyleSheet, Text, View, Button } from 'react-native';

class SortBox extends Component {
  render(){
    const { items, itemChange } = this.props;

    const options = items.map((sortItem) =>
      <Button title={sortItem.label} onPress={() => {
        itemChange(sortItem.key);
      }}/>
    );
    return(
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize:16,
          justifyContent: 'center',
          paddingTop: 10,
          paddingLeft: 10}}>Sort By : </Text>
        { options }
      </View>
      )
  }
}

export default SortBox;
