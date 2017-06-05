/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';
import Dimensions from 'Dimensions';
const totalWidth = Dimensions.get('window').width;
import CommonCell from './CommonCell.js';

export default class More extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.renderTitle()}
        <ScrollView
          bounces={false}
        >
          <CommonCell title="扫一扫" description="" isSwitch={false} isFirst={true}/>
          <CommonCell title="省流量模式" description="" isSwitch={true} isFirst={true}/>
          <CommonCell title="消息提醒" description="" isSwitch={false} isFirst={false}/>
          <CommonCell title="邀请好友" description="" isSwitch={false} isFirst={false}/>
          <CommonCell title="清空缓存" description="1.94M" isSwitch={false} isFirst={false}/>
          <CommonCell title="意见反馈" description="" isSwitch={false} isFirst={true}/>
          <CommonCell title="问卷调查" description="" isSwitch={false} isFirst={false}/>
          <CommonCell title="支付帮助" description="" isSwitch={false} isFirst={false}/>
          <CommonCell title="网络诊断" description="" isSwitch={false} isFirst={false}/>
          <CommonCell title="关于美团" description="" isSwitch={false} isFirst={false}/>
          <CommonCell title="我要应聘" description="" isSwitch={false} isFirst={false}/>
          <CommonCell title="精品应用" description="" isSwitch={false} isFirst={true}/>
        </ScrollView>
      </View>
    );
  }
  renderTitle = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.moreText}>更多</Text>
        <TouchableOpacity onPress={() => {alert('更多')}} style={styles.morePosition}>
          <Image source={{uri: 'icon_mine_setting'}} style={styles.moreImg}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240,239,245)',
  },
  header: {
    width: totalWidth,
    height: Platform.OS === 'ios' ? 64 : 44,
    backgroundColor:'rgb(255,96,0)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
