/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import HeadView from './HeadView.js';
import CommonCell from './CommonCell.js';
import FunctionView from './FunctionView.js';

export default class Mine extends Component {
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentInset={{top: -200}}
        contentOffset={{y: 200}}
      >
        <HeadView />
        <View>
          <CommonCell
            leftIcon='collect'
            leftTitle='我的订单'
            rightDescription='查看全部订单'
            nextIcon='icon_cell_rightArrow'
          />
          <FunctionView />
          <CommonCell
            leftIcon='draft'
            leftTitle='我的钱包'
            rightDescription='余额：￥100'
            nextIcon='icon_cell_rightArrow'
            isFirst={true}
          />
          <CommonCell
            leftIcon='like'
            leftTitle='抵用券'
            rightDescription='10'
            nextIcon='icon_cell_rightArrow'
          />
          <CommonCell
            leftIcon='card'
            leftTitle='积分商城'
            nextIcon='icon_cell_rightArrow'
            isFirst={true}
          />
          <CommonCell
            leftIcon='new_friend'
            leftTitle='今日推荐'
            rightIcon='me_new'
            nextIcon='icon_cell_rightArrow'
            isFirst={true}
          />
          <CommonCell
            leftIcon='pay'
            leftTitle='我要合作'
            rightDescription='轻松开店，招财进宝'
            nextIcon='icon_cell_rightArrow'
            isFirst={true}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240,239,245)',
  },
});
