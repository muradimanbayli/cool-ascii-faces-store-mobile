import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, StatusBar,
        FlatList,Alert
} from 'react-native';
import StatusBarPanel from './src/StatusBarPanel';
import {fetchProducts } from './src/api';
import Products from './src/Products';
import SortBox from './src/SortBox';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sortItems : [],
      productItems : [],
      currentPage : 0,
      limit : 40,
      currentSort : "id" ,
      nextProductsToLoad : []
    }
  }

  componentWillMount(){
    const sortItems = [{ label: "Id", key : "id" },
                       { label: "Size", key : "size" },
                       { label: "Price", key : "price" }];
    this.setState({ sortItems : sortItems });

    fetchProducts(this.state.currentPage, this.state.currentSort)
    .then((response)=>{
      this.setState({ productItems : response });
    });

    this.loadNextProducts();
  }

  loadNextProducts = () => {
    const nextPage = this.state.currentPage + 1 ;
    fetchProducts(nextPage, this.state.limit ,this.state.currentSort)
    .then((response)=>{
      this.setState({ nextProductsToLoad : response});
    })
    this.setState({ currentPage : nextPage });
  }

  sort = (sortItem) => {
    fetchProducts(0, this.state.limit, sortItem)
    .then((response)=>{
        this.setState({ productItems : response});
    })
  }

  nextContent = () => {
    const temp = this.state.nextProductsToLoad;
    this.loadNextProducts();
    return temp
  }

  render() {
    let {sortItems,productItems} = this.state ;
    return (
      <View style={styles.container}>
        <StatusBarPanel/>
        <SortBox items={sortItems} itemChange={this.sort}/>
        <Products items={productItems} nextContent={this.nextContent}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
