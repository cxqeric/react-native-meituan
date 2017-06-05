/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
	ListView,
	Image,
} from 'react-native';
import Dimensions from 'Dimensions';
const totalWidth = Dimensions.get('window').width;

export default class CarouselItems extends Component {
	static defaultProps = {
		data: []
	}
	static propTypes = {
		data: PropTypes.arrayOf(PropTypes.shape({
			'title': PropTypes.string.isRequired,
			'image': PropTypes.string.isRequired
		}).isRequired).isRequired
	}
	state = {
		dataSource: new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
		}).cloneWithRows(this.props.data),
	}
	_renderRow = (item) => {
		return (
			<View style={styles.item}>
				<Image source={{uri: item.image}} style={styles.itemImg}/>
				<Text style={styles.itemText}>{item.title}</Text>
			</View>
		)
	}
  render() {
		let { data } = this.props;
    return (
      <ListView
				dataSource={this.state.dataSource}
				renderRow={this._renderRow}
				contentContainerStyle={styles.listView}
			/>
    );
  }
}

const styles = StyleSheet.create({
  listView: {
		// flex: 1,
    flexDirection: 'row',
		flexWrap: 'wrap',
		width: totalWidth,
		backgroundColor: '#fff',
  },
	item: {
		width: Math.floor((totalWidth - 60) / 5),
		height: 70,
		marginLeft: 10,
		alignItems: 'center',
		justifyContent: 'center',
		// marginBottom: 10,
	},
	itemImg: {
		width: 40,
		height: 40,
	},
	itemText: {
		fontSize: 12,
		paddingTop: 5,
	}
});
