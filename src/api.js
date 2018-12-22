import {Platform} from 'react-native';


export const fetchProducts = async (page,limit,sort) => {
  const host = Platform.OS === 'ios' ? 'localhost' : '10.0.0.2';
  const response = await fetch('http://'+host+':3000/products?_page='+page+'&_limit='+limit+'&_sort='+sort);
  const results = await response.json();
  return results;
}
