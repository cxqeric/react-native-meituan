/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
	TouchableOpacity,
} from 'react-native';

export default class Test extends Component {
  render() {
		// alert(this.props.navigator.pop)
    return (
				<View style={styles.container}>
					<TouchableOpacity  onPress={() => {this.props.navigator.pop()}}>
						<Text>I'm the Test component</Text>
					</TouchableOpacity>
				</View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'red',
  },
});
