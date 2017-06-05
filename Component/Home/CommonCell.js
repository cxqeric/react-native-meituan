/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
	Image,
	TouchableOpacity
} from 'react-native';
import Test from './test.js';

export default class CommonCell extends Component {
	static defaultProps = {
		width: -1,
		height: -1,
		title: '',
		subTitle: '',
		rightImage: '',
		titleColor: '',
	}
	static propTypes = {
		title: PropTypes.string.isRequired
	}
	navToAct2 = (tplurl) => {
		if(tplurl !== undefined) {
			// this.props.navigator.push({
			// 	component: Test,
			// 	name: '详情页'
			// })
			this.props.navToAct2();
		}
	}
  render() {
		const {width, height, title, subTitle, rightImage, titleColor, rightImageWidth, rightImageHeight, isBig, tplurl, callBackClickCell} = this.props;
		console.log(this.props)
    return (
			<TouchableOpacity onPress={() => {this.navToAct2(this.props.tplurl)}}>
				<View style={[styles.container,{width: width, height: height}]}>
					<View>
						<Text style={{color: titleColor, fontSize: isBig ? 20 : 16}}>{title}</Text>
						<Text style={{color: '#ccc', fontSize: isBig ? 18 : 14, marginTop: 5}}>{subTitle}</Text>
					</View>
					<Image source={{uri: rightImage}} style={{width: rightImageWidth ? rightImageWidth : 64, height: rightImageHeight ? rightImageHeight : 43, resizeMode: 'contain'}}/>
				</View>
			</TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		borderTopWidth: 0.5,
		borderTopColor: '#ccc',
		borderBottomWidth: 0.5,
		borderBottomColor: '#ccc',
		alignItems: 'center',
		borderRightWidth: 0.5,
		borderRightColor: '#ccc'
  },
	description: {
		justifyContent: 'center',
	},
});
