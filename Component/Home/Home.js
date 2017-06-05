/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  Image,
  ScrollView
} from 'react-native';
import Dimensions from 'Dimensions';
const totalWidth = Dimensions.get('window').width;
import Carousel from './Carousel.js';
import HomeActivities1 from './HomeActivities1.js';
import HomeActivities2 from './HomeActivities2.js';
import Test from './test.js';
import ShopCenter from './ShopCenter.js';
import ShopCenterDetail from './ShopCenterDetail.js';
import GuessWhatYouLike from './GuessWhatYouLike.js';

export default class Home extends Component {
  navToAct2 = () => {
    this.props.navigator.push({
      component: Test,
      name: 'test',
    })
  }
  navToShopCenter = (url) => {
    url += '?uuid=5C7B6342814C7B496D836A69C872202B5DE8DB689A2D777DFC717E10FC0B4271&utm_term=6.6&utm_source=AppStore&utm_content=5C7B6342814C7B496D836A69C872202B5DE8DB689A2D777DFC717E10FC0B4271&version_name=6.6&userid=160495643&utm_medium=iphone&lat=23.134709&utm_campaign=AgroupBgroupD100Ghomepage_shoppingmall_detailH0&token=b81UqRVf6pTL4UPLLBU7onkvyQoAAAAAAQIAACQVmmlv_Qf_xR-hBJVMtIlq7nYgStcvRiK_CHFmZ5Gf70DR47KP2VSP1Fu5Fc1ndA&lng=113.373890&f=iphone&ci=20&msid=0FA91DDF-BF5B-4DA2-B05D-FA2032F30C6C2016-04-04-08-38594'
    this.props.navigator.push({
      component: ShopCenterDetail, // 要跳转的版块
      passProps: {'url': this.dealWithUrl(url)}
    });
  }
  dealWithUrl(url) {
    return url.split('url=')[1];
  }
  render() {
    return (
      <View style={styles.container}>
        {/* 导航条 */}
        <View style={styles.navBar}>
          <TouchableOpacity>
            <Text style={styles.region}>合肥</Text>
          </TouchableOpacity>
          <View>
            <TextInput
              style={styles.input}
              keyboardType='web-search'
              underlineColorAndroid='transparent'
              returnKeyType='join'
              returnKeyLabel='search'
              // 是否显示清除按钮
              clearButtonMode='always'
            />
          </View>
          <TouchableOpacity>
            <Image source={{uri: 'icon_homepage_scan'}} style={styles.scan}/>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Carousel />
          <HomeActivities1 />
          <HomeActivities2 navToAct2={() => {this.navToAct2()}}/>
          <ShopCenter navToShopCenter={(url) => {this.navToShopCenter(url)}}/>
          <GuessWhatYouLike />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240,239,245)',
  },
  navBar: {
    height: Platform.OS === 'ios' ? 64 : 44,
    backgroundColor: 'rgb(255,96,0)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  region: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    marginRight: 20,
    marginTop: Platform.OS == 'ios' ? 14 : 0,
  },
  input: {
    width: totalWidth * 0.7,
    height: Platform.OS === 'ios' ? 34 : 30,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 17,
    paddingLeft: 10,
    marginTop: Platform.OS == 'ios' ? 14 : 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  scan: {
    width: 28,
    height: 28,
    marginTop: Platform.OS === 'ios' ? 14 : 0,
    marginLeft: 10,
  }
});
