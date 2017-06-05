/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
	Platform,
	Image,
	TouchableOpacity,
} from 'react-native';
import Dimensions from 'Dimensions';
const totalWidth = Dimensions.get('window').width;

export default class HeadView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dataView}>
					<Image source={{uri: 'see'}} style={styles.myPhoto}/>
					<View style={styles.myData}>
						<Text style={styles.myName}>real</Text>
						<Image source={{uri: 'avatar_vip'}} style={styles.myRate}/>
					</View>
					<Image source={{uri: 'icon_cell_rightArrow'}} style={styles.rightIcon}/>
				</View>
				<View style={styles.contentView}>
					{this.renderOther()}
				</View>
			</View>
    );
  }
	renderOther() {
		let dataArr = [
			{title: '点券', number: 100},
			{title: '评价', number: 20},
			{title: '收藏', number: 1000}
		];
		let viewArr = [];
		const lastData = dataArr.length - 1;
		dataArr.forEach((item, i) => {
			viewArr.push(
				<TouchableOpacity activeOpacity={0.5} key={i}>
					<View style={[styles.content, {borderRightWidth: i === lastData ? 0 : 1}]}>
						<Text style={styles.contentText}>{item.number}</Text>
						<Text style={styles.contentText}>{item.title}</Text>
					</View>
				</TouchableOpacity>
			)
		})
		return viewArr;
	}
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 400 : 200,
		backgroundColor: 'rgba(255,96,0,1.0)'
  },
	contentView: {
		position: 'absolute',
		bottom: 0,
		width: totalWidth,
		height: 50,
		flexDirection: 'row',
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
	},
	content: {
		width: totalWidth / 3,
		justifyContent: 'center',
		alignItems: 'center',
		borderRightWidth:1,
		borderRightColor: '#fff',
		height: 50,
	},
	contentText: {
		fontSize: 16,
		color: '#fff',
		lineHeight: 22,
	},
	myData: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 20
  },
  myPhoto: {
    width:70,
    height:70,
    borderRadius:35,
    borderWidth:3,
		marginLeft: 20,
    borderColor:'rgba(0,0,0,0.2)'
  },
	myName: {
		fontSize: 24,
		color: '#fff',
		// textDecorationLine: 'underline'
	},
	myRate: {
		width: 17,
		height: 17,
	},
	dataView: {
		marginTop: Platform.OS === 'ios' ? 260 : 60,
		flexDirection: 'row',
		alignItems: 'center',
	},
	rightIcon: {
		position: 'absolute',
		right: 10,
		width: 8,
		height: 13,
		marginRight: 8,
	}
});
