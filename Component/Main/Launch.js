/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
	Image
} from 'react-native';
import Main from './Main.js';
export default class Launch extends Component {
	timer = -1;
  render() {
    return (
      <Image source={{uri: 'launchimage'}} style={styles.launchImage}/>
    );
  }
	componentDidMount() {
		this.timer = setTimeout(() => {
			this.props.navigator.replace({
				component: Main
			})
		}, 1500)
	}
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}
}

const styles = StyleSheet.create({
  launchImage: {
    flex: 1,
  },
});
