/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
	WebView,
	TouchableOpacity,
	Platform,
	Image
} from 'react-native';
import Dimensions from 'Dimensions';
import BackHandler from 'BackHandler';
const totalWidth = Dimensions.get('window').width;


export default class ShopCenter extends Component {
	renderTitle = () => {
    return (
      <View style={styles.header}>
				<TouchableOpacity style={styles.returnPosition} onPress={() => {this.props.navigator.pop()}}>
					<Image source={{uri: 'navigationbar_arrow_up'}} style={styles.returnImg}/>
				</TouchableOpacity>
        <Text style={styles.moreText}>购物中心详情</Text>
        <TouchableOpacity onPress={() => {alert('更多')}} style={styles.morePosition}>
          <Image source={{uri: 'icon_mine_setting'}} style={styles.moreImg}/>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
		// console.log(this.props)
    return (
      <View style={styles.container}>
        {this.renderTitle()}
				<WebView
					automaticallyAdjustContentInsets={false}
					javaScriptEnabled={true}
					domStorageEnabled={true}
					source={{uri: this.props.url}}
				/>
      </View>
    );
  }
	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			this.props.navigator.pop();
			return true;
		})
	}
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress');
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
	header: {
    width: totalWidth,
    height: Platform.OS === 'ios' ? 64 : 44,
    backgroundColor:'rgb(255,96,0)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
	returnPosition: {
		position: 'absolute',
		left: 10,
	},
	returnImg: {
		width: 20,
		height: 20,
		resizeMode: 'contain'
	},
  moreText: {
    fontSize: 16,
    color: '#fff',
  },
  morePosition: {
    position: 'absolute',
    right: 10,
  },
  moreImg: {
    width: 24,
    height: 24
  }
});
