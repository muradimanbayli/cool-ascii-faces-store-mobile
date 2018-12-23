import React, {Component} from 'react';
import {StyleSheet, Text, View, Button , ScrollView, Alert} from 'react-native';
import Product from './Product';
import Ad from './Ad';

class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      items : this.props.items,
      isLoading : false,
      hasNoMoreData : false,
      gridSize : 1
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.items !== this.props.items){
        this.setState({ items: this.props.items });
    }
  }

  isBottom = ({layoutMeasurement, contentOffset, contentSize})=>{
   return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
  }

  onScroll = ({nativeEvent}) => {
    if (this.isBottom(nativeEvent)){
        this.setState({isLoading:true});
        setTimeout(() => {
           if(this.props.nextContent().length === 0){
             this.setState({ hasNoMoreData : true});
           }else{
             const items = [...this.state.items,...this.props.nextContent()];
             this.setState({ items : items , isLoading : false});
           }
        },1000)
    }
  }

  getAdPanel = (index) => {
    if(index % 10 === 0 && index !== 0){
      return <Ad/> ;
    }
  }

  getProductsItems = () => {
    let items = [];
    for(let i=0;i<this.state.items.length;i+=2){
      let firstChild = <Product face={this.state.items[i].face}
                                 size={this.state.items[i].size}
                                 id={this.state.items[i].id}
                                 date={this.state.items[i].date}
                                 price={this.state.items[i].price}  />;
     let secondChild;
     if(typeof this.state.items[i+1]!=='undefined'){
         secondChild = <Product face={this.state.items[i+1].face}
                                size={this.state.items[i+1].size}
                                id={this.state.items[i+1].id}
                                date={this.state.items[i+1].date}
                                price={this.state.items[i+1].price}/>;
     }
    items.push(this.getAdPanel(i)); 
    items.push(<View style={{flexDirection: 'row', padding: 2}}>
                    {firstChild}
                    {secondChild}
                </View>);
    }

    return items;
  }

  isBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
      const paddingToBottom = 20;
      return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
  }

  getLoadingScreen = () => {
    if(this.state.isLoading){
      return <View style={{textAlign:'center',flex: 1, fontSize: 23}}><Text>loading ... </Text></View>
    }
  }

  getNoDataScreen = () => {
    if( this.state.hasNoMoreData ){
      return <View><Text>~ end of catalogue ~</Text></View>
    }
  }

  render(){
    return(
      <ScrollView style={{flex:1, marginBottom: 20}} onScroll={this.onScroll}>
        { this.getProductsItems() }
        { this.getLoadingScreen() }
        { this.getNoDataScreen() }
      </ScrollView>
      )
  }
}

export default Products;
