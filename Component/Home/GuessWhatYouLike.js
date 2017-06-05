/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
	ListView,
	TouchableOpacity,
	Image
} from 'react-native';
import CommonCell from '../Mine/CommonCell.js';
import HomeGuessWhatYouLike from '../../LocalData/HomeGuessWhatYouLike.js';

export default class GuessWhatYouLike extends Component {
	static defaultProps = {
		url: 'http://api.meituan.com/group/v2/recommend/homepage/city/20?userId=160495643&userid=160495643&__vhost=api.mobile.meituan.com&position=23.134643%2C113.373951&movieBundleVersion=100&utm_term=6.6&limit=40&wifi-mac=64%3A09%3A80%3A10%3A15%3A27&ci=20&__skcy=X6Jxu5SCaijU80yX5ioQuvCDKj4%3D&__skua=5657981d60b5e2d83e9c64b453063ada&__skts=1459731016.350255&wifi-name=Xiaomi_1526&client=iphone&uuid=5C7B6342814C7B496D836A69C872202B5DE8DB689A2D777DFC717E10FC0B4271&__skno=FEB757F5-6120-49EC-85B0-D1444A2C2E7B&utm_content=5C7B6342814C7B496D836A69C872202B5DE8DB689A2D777DFC717E10FC0B4271&utm_source=AppStore&utm_medium=iphone&version_name=6.6&wifi-cur=0&wifi-strength=&offset=0&utm_campaign=AgroupBgroupD100H0&__skck=3c0cf64e4b039997339ed8fec4cddf05&msid=0FA91DDF-BF5B-4DA2-B05D-FA2032F30C6C2016-04-04-08-38594'
	}
	state = {
		dataSource: new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		})
	}
	componentDidMount() {
		let response = null;
		fetch(this.props.url)
		.then(res => {response = res; return response.json()})
		.then(json => {
			if(response.ok) {
				this.setState({dataSource: this.state.dataSource.cloneWithRows(json.data)});
			} else {
				return Promise.reject(json);
			}
		})
		.catch(err => {
			this.setState({dataSource: this.state.dataSource.cloneWithRows(HomeGuessWhatYouLike.data)});
			// console.error(err);
		})
	}
	// 处理图像的尺寸
  dealWithImgUrl(url){
    if (url.search('w.h') == -1){ // 没有找到,正常返回
      return url;
    }else{
      return url.replace('w.h', '120.90');
    }
  }
	_renderRow = (rowData) => {
		return (
			<TouchableOpacity onPress={()=>alert(0)}>
        <View style={styles.listViewStyle}>
          {/*左边*/}
          <Image source={{uri:this.dealWithImgUrl(rowData.imageUrl)}} style={styles.imageViewStyle}/>
          {/*右边*/}
          <View style={styles.rightViewStyle}>
            <View style={styles.rightTopViewStyle}>
              <Text>{rowData.title}</Text>
              <Text>{rowData.topRightInfo}</Text>
            </View>
            <Text style={{color:'gray'}}>{rowData.subTitle}</Text>
            <View  style={styles.rightBottomViewStyle}>
              <Text style={{color:'red'}}>{rowData.subMessage}</Text>
              <Text>{rowData.bottomRightInfo}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
		)
	}
  render() {
    return (
      <View style={styles.container}>
				<CommonCell
					leftIcon='cnxh'
					leftTitle='猜你喜欢'
					nextIcon='icon_cell_rightArrow'
					isFirst={true}
				/>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this._renderRow}
				/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
	listViewStyle:{
    backgroundColor:'white',
    padding:10,
    borderBottomColor:'#e8e8e8',
    borderBottomWidth:0.5,
    flexDirection:'row'
  },
  imageViewStyle:{
    width:120,
    height:90
  },
  rightViewStyle:{
    marginLeft:8,
    width:220,
    justifyContent:'center'
  },
  rightTopViewStyle:{
    flexDirection:'row',
    marginBottom:7,
    justifyContent:'space-between'
  },
  rightBottomViewStyle:{
    flexDirection:'row',
    marginTop:7,
    justifyContent:'space-between'
  }
});
