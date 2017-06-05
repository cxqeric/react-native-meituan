/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Main from './Component/Main/Main.js';

export default class meituan extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('meituan', () => meituan);
