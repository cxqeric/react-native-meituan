/* @flow weak */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
	Image
} from 'react-native';
import Functions from './Function.js';
import Dimensions from 'Dimensions';
const totalWidth = Dimensions.get('window').width;

const FunctionView = () => (
  <View style={styles.container}>
		{Functions.map((item, i) => {
			return (
				<View key={i} onPress={() => {alert(item.title)}} style={styles.someFun}>
					<Image source={{uri: item.iconName}} style={styles.functionImage}/>
					<Text style={styles.functionText}>{item.title}</Text>
				</View>
			)
		})}
  </View>
);

export default FunctionView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
		flexDirection: 'row',
		paddingTop: 5,
		paddingBottom: 5,
		backgroundColor: '#fff',
  },
	someFun: {
		width: totalWidth / 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	functionImage: {
		width: 40,
		height: 30,
	},
	functionText: {
		color: '#999',
		fontSize: 14,
		lineHeight: 22,
	}
});
