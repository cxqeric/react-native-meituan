/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import HomeActivities2Top from '../../LocalData/Home_activities_2_top.js';
import HomeActivities2Bottom from '../../LocalData/Home_activities_2_bottom.js';
import CommonCell from './CommonCell.js';
import Dimensions from 'Dimensions';
const totalWidth = Dimensions.get('window').width;

export default class HomeAct2 extends Component {
  render() {
		let topData = HomeActivities2Top.data[0];
    return (
      <View style={styles.container}>
				<CommonCell
					width={totalWidth}
					height={80}
					title={topData.title}
					subTitle={topData.subTitle}
					// 是否是大号标题
					isBig={true}
					rightImage={topData.rightImage}
					rightImageWidth={150}
					rightImageHeight={60}
					titleColor={topData.titleColor}
				/>
        <View style={styles.smallCells}>
					{this.renderSmallCell()}
				</View>
      </View>
    )
  }
	// 处理图像的尺寸
  dealWithImgUrl = (url) => {
     if (url.search('w.h') === -1){ // 没有找到,正常返回
         return url;
     }else{
         return url.replace('w.h', '120.90');
     }
  }
	renderSmallCell() {
		let smallCells = HomeActivities2Bottom.data.map((item, i) => {
			return (
				<CommonCell
					// navigator={this.props.navigator}
					key={i}
					width={totalWidth/2}
					height={60}
					title={item.maintitle}
          subTitle={item.deputytitle}
          rightImage={this.dealWithImgUrl(item.imageurl)}
          titleColor={item.typeface_color}
          tplurl={item.tplurl}
					navToAct2 = {() => {this.props.navToAct2()}}
				/>
			)
		})
		return smallCells;
	}
}

const styles = StyleSheet.create({
  container: {
		marginTop: 20,
		height: 200,
		backgroundColor: '#fff',
  },
	smallCells: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	}
});
