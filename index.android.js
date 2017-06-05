/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import Launch from './Component/Main/Launch.js';

export default class meituan extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{name: 'launch', component: Launch}}
        configureScene={() => {
          return Navigator.SceneConfigs.PushFormRight;
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          return <Component {...route.passProps} navigator={navigator}/>
        }}
      />
    );
  }
}

AppRegistry.registerComponent('meituan', () => meituan);
