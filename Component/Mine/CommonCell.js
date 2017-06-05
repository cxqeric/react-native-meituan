/* @flow weak */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
	Image,
	TouchableOpacity
} from 'react-native';

const CommonCell = ({leftIcon, leftTitle, rightDescription, rightIcon, nextIcon, isFirst}) => (
  <TouchableOpacity style={{marginTop: isFirst ? 10 : 0}}>
		<View style={styles.container}>
			<View style={styles.left}>
				<Image source={{uri: leftIcon}} style={styles.leftIcon}/>
				<Text style={styles.text}>{leftTitle}</Text>
			</View>
			<View style={styles.right}>
				{rightDescription ? <Text style={styles.text}>{rightDescription}</Text> : null}
				{rightIcon ? <Image source={{uri: rightIcon}} style={styles.rightIcon}/> : null}
				<Image source={{uri: nextIcon}} style={styles.nextIcon}/>
			</View>
		</View>
	</TouchableOpacity>
);
CommonCell.propTypes = {
	leftTitle: PropTypes.string.isRequired,
}

export default CommonCell;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth:1,
		borderBottomColor: 'rgba(200,200,200,0.8)'
  },
	text: {
		fontSize: 14,
	},
	left: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	right: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	leftIcon: {
		width: 24,
		height: 24,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 12,
	},
	rightIcon: {
		width: 24,
		height: 13,
	},
	nextIcon: {
		width: 8,
		height: 13,
		marginLeft: 10,
		marginRight: 10,
	}
});
