/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
	ScrollView,
} from 'react-native';
import HomeTopMenu from '../../LocalData/HomeTopMenu.js';
import CarouselItems from './CarouselItems.js';
import Dimensions from 'Dimensions';
const totalWidth = Dimensions.get('window').width;

export default class Carousel extends Component {
  timer = -1
  state = {
    currentPage: 0,
  }
  _onMomentumScrollEnd = (e) => {
    let currentPage = -1;
    let x = e.nativeEvent.contentOffset.x;
    let page = Math.round(x / totalWidth);
    this.setState({
      currentPage: page,
    })
  }
  componentDidMount() {
    this.startTimer();
  }
  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }
  startTimer() {
    this.timer && clearInterval(this.timer);
    let totalPage = HomeTopMenu.data.length;
    this.timer = setInterval(() => {
      let currentPage = this.state.currentPage;
      if(currentPage + 1 === totalPage) { //滚动到最后一页
        currentPage = 0;
      } else {
        currentPage += 1;
      }
      this.setState({
        currentPage
      })
      let x = currentPage * totalWidth;
      this.refs.scrollView.scrollTo({x: x, y: 0, animated: true})
    }, 5000)
  }
  _onScrollBeginDrag = () => {
    this.timer && clearInterval(this.timer);
  }
  _onScrollEndDrag = () => {
    this.startTimer();
  }
  render() {
    return (

      <View style={styles.container}>
        <ScrollView
          ref="scrollView"
					horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollBeginDrag={this._onScrollBeginDrag}
          onScrollEndDrag={this._onScrollEndDrag}
				>
					{this.renderItems()}
        </ScrollView>
        <View style={styles.dots}>
          {this.renderDots()}
        </View>
      </View>
    );
  }
	renderItems() {
    let views = HomeTopMenu.data.map((item, i) => {
      return (
        <CarouselItems data={item} key={i}/>
      )
    })
    return views;
  }
	renderDots() {
    let dots = HomeTopMenu.data.map((item, i) => {
      let color = (i === this.state.currentPage) ? 'orange' : 'grey';
      return (
        <Text key={i} style={[styles.dot, {color: color}]}>&bull;</Text>
      )
    })
    return dots
	}
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  dots: {
    flexDirection: 'row',
    width: totalWidth,
    height: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  dot: {
    fontSize: 20,
  }
});
