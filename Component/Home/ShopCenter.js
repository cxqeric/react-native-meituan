/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
	ScrollView,
	TouchableOpacity,
	Image
} from 'react-native';
import HomeShopCenter from '../../LocalData/HomeShopCenter.js';
import CommonCell from '../Mine/CommonCell.js';

export default class ShopCenter extends Component {
	navToShopCenter = (url) => {
		if(url) {
			this.props.navToShopCenter(url);
		}
	}
	renderItems = () => {
		let itemsArr = HomeShopCenter.data.map((item, i) => {
			return (
				<TouchableOpacity key={i} onPress={()=>this.navToShopCenter(item.detailurl)}>
           <View style={styles.itemViewStyle}>
               <Image source={{uri: item.img}} style={styles.imageStyle}/>
               <Text style={styles.shopSaleStyle}>{item.showtext.text}</Text>
               <Text style={styles.shopNameStyle}>{item.name}</Text>
           </View>
       </TouchableOpacity>
			)
		})
		return itemsArr;
	}
  render() {
    return (
      <View style={styles.container}>
        <CommonCell
					leftIcon='gw'
					leftTitle='购物中心'
					rightDescription={HomeShopCenter.tips}
					nextIcon='icon_cell_rightArrow'
					isFirst={true}
				/>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					style={styles.scrollViewStyle}
				>
					{this.renderItems()}
				</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle:{
    width:120,
    height:100,
    borderRadius:8
  },

  scrollViewStyle:{
    flexDirection:'row',
    backgroundColor:'white',
    padding:10
  },

  itemViewStyle:{
    margin:8
  },

  shopSaleStyle:{
    // 绝对定位
    position:'absolute',
    left:0,
    bottom:30,
    backgroundColor:'red',
    color:'white',
    padding:2
  },

  shopNameStyle:{
    textAlign:'center',
    marginTop:5
  }
});
