/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
	StatusBar,
  Image,
  Platform
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import TabNavigator from 'react-native-tab-navigator';
import Home from '../Home/Home.js';
import Mine from '../Mine/Mine.js'
import More from '../More/More.js'
import Shop from '../Shop/Shop.js'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabBar: 'home'
    }
  }
	renderItem = (navArr) => {
    return navArr.map((item, i) => {
      let {title, renderIcon, renderSelectedIcon, selectedTabBar, badgeText, component, name} = item;
      return (
        <TabNavigator.Item
          key={i}
          title={title}
          renderIcon={() => <Image source={{uri: renderIcon}} style={styles.iconStyle}/>}
          renderSelectedIcon={() => <Image source={{uri: renderSelectedIcon}} style={styles.iconStyle}/>}
          selected={this.state.selectedTabBar===selectedTabBar}
          onPress={() => {this.setState({selectedTabBar})}}
          selectedTitleStyle={styles.selectedTitleStyle}
          badgeText={badgeText}
          >
          <Navigator
            initialRoute={{name, component}}
            configureScene={() => {return Navigator.SceneConfigs.PushFromRight}}
            renderScene={(route, navigator) => {
              let Component = route.component;
              return <Component {...route.passProps} navigator={navigator}/>
            }}
          />
        </TabNavigator.Item>
        )
    })
  }
  render() {
    return (
      <TabNavigator>
				{this.renderItem([
          {title: '首页', renderIcon: 'icon_tabbar_homepage', renderSelectedIcon: 'icon_tabbar_homepage_selected', selectedTabBar: 'home', badgeText: 0, component: Home, name: '首页', },
          {title: '商家', renderIcon: 'icon_tabbar_merchant_normal', renderSelectedIcon: 'icon_tabbar_merchant_selected', selectedTabBar: 'shop', badgeText: 0,  component: Shop, name: '商家', },
          {title: '我的', renderIcon: 'icon_tabbar_mine', renderSelectedIcon: 'icon_tabbar_mine_selected', selectedTabBar: 'mine', badgeText: 0,  component: Mine, name: '我的', },
          {title: '更多', renderIcon: 'icon_tabbar_misc', renderSelectedIcon: 'icon_tabbar_misc_selected', selectedTabBar: 'more', badgeText: 0,  component: More, name: '更多', }
        ])}
			</TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		marginTop: StatusBar.currentHeight
  },
  iconStyle: {
    width: Platform.OS === 'ios' ? 30 : 25,
    height: Platform.OS === 'ios' ? 30 : 25,
  },
  selecedTextStyle: {
    color: 'orange',
  }
});
