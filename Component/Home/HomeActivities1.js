/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
	Image
} from 'react-native';
import Dimensions from 'Dimensions';
const totalWidth = Dimensions.get('window').width;
import HomeAct1 from '../../LocalData/Home_activities_1.js';
import CommonCell from './CommonCell.js';

export default class HomeActivities1 extends Component {
	renderLeft() {
		let leftData = HomeAct1.dataLeft;// {"img1" : "mdqg", "img2" : "yyms", "title" : "探路组碳烤鱼", "price": "¥9.5", "sale": "再减3元"}
		let leftView = leftData.map((data, i) => {
			return (
				<View key={i}>
					<Image source={{uri: data.img1}} style={styles.leftImage}/>
					<Image source={{uri: data.img2}} style={styles.leftImage}/>
					<Text style={styles.title}>{data.title}</Text>
					<View style={styles.priceAndSale}>
						<Text style={styles.price}>{data.price}</Text>
						<Text style={styles.sale}>{data.sale}</Text>
					</View>
				</View>
			)
		})
		return leftView;
	}
	renderRight() {
		let rightData = HomeAct1.dataRight;// {"title" : "天天特价", "subTitle" : "特惠不打烊", "rightImage" : "tttj", "titleColor": "orange"},
		let rightView = rightData.map((data, i) => {
			return <CommonCell
				key={i}
				width={totalWidth/2}
				height={60}
				title={data.title}
				subTitle={data.subTitle}
				rightImage={data.rightImage}
				titleColor={data.titleColor}
			/>
		})
		return rightView;
	}
  render() {

    return (
      <View style={styles.container}>
				<View style={styles.left}>
					{this.renderLeft()}
				</View>
				<View style={styles.right}>
					{this.renderRight()}
				</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
		backgroundColor: '#fff',
		marginTop: 20,
		flexDirection: 'row',
  },
	left: {
		width: (totalWidth / 2),
		height: 120,
		borderTopWidth: 0.5,
		borderTopColor: '#ccc',
		borderBottomWidth: 0.5,
		borderBottomColor: '#ccc',
		borderRightWidth: 1,
		borderRightColor: '#ccc',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	leftImage: {
		width: 120,
		height: 30,
		resizeMode: 'contain',
	},
	priceAndSale: {
		flexDirection: 'row',
		marginTop: 5,
	},
	title: {
		fontSize: 16,
		color: '#999',
		marginTop: 5,
	},
	price: {
		color: '#3ec6b5'
	},
	sale: {
		backgroundColor: '#ffff0b',
		color: '#feb708',
	}
});
