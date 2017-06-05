/* @flow weak */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
	Switch,
	Image,
  TouchableOpacity
} from 'react-native';

class CommonCell extends Component {
	static defaultProps = {
		title: '',
		description: '',
		isSwitch: false,
		isFirst: false,
	}
	static propTypes = {
		title: PropTypes.string.isRequired,
    description: PropTypes.string,
    isSwitch: PropTypes.bool,
    isFirst: PropTypes.bool,
	};
	state = {
		isSwitchOpen: false
	}
	render() {
		const { title, description, isSwitch, isFirst } = this.props;
		console.log(title, description, isSwitch)
		return (
      <TouchableOpacity activeOpacity={0.5}>
        <View style={[styles.container, {marginTop: isFirst ? 10 : 0 }]}>
          <Text style={styles.title}>{title}</Text>
          {description !== '' ? <Text style={styles.description}>{description}</Text> : null}
          {isSwitch !== false ?
            <Switch
              style={{marginRight: 10}}
              value={this.state.isSwitchOpen}
              onValueChange={(value) => {this.setState({isSwitchOpen: !this.state.isSwitchOpen})}}
            /> : <Image
              source={{uri: 'icon_cell_rightArrow'}}
              style={styles.rightIcon}
            />}
          </View>
      </TouchableOpacity>
		)
	}
};


export default CommonCell;

const styles = StyleSheet.create({
  container: {
    height: 40,
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth:1,
		borderBottomColor: 'rgba(200,200,200,0.8)'
  },
	title: {
		marginLeft: 10,
		fontSize: 16,
    color: '#333',
	},
	description: {
		position: 'absolute',
		right: 25,
	},
	rightIcon: {
		width: 8,
		height: 13,
		marginRight: 10,
	}
});
