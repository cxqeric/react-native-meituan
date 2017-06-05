# react-native-meituan
跨平台app。持续更新。目前是v1版本。

通过这个小项目，掌握了react-native的一些组件的用法。本项目react-native的版本是`0.44.2`。

## 一些变化

- 自0.40版本开始，对于`Image`组件的`source`属性，不再支持`require('image!...')`。详情请见：http://reactnative.com/react-native-december-2016-v0-40-0-released/
所以本项目中使用的都是uri的形式，不知为何，我使用uri的形式使用相对路径应用图片无法识别。所以我将图片放在项目目录下。在android下是`\android\app\src\main\res\drawable`(针对不同分辨率设备目录为`drawable`,`drawable-mdpi`,`drawable-hdpi`,`drawable-xhdpi`,`drawable-xxhdpi`)。在IOS下目录是`\ios\项目名\Images.xcassets`。

- 从0.44版本开始，`Navigator`被从react-native的核心组件库中剥离到了一个名为`react-native-deprecated-custom-components`的单独模块中。如果你需要继续使用`Navigator`，则需要先`npm i -S react-native-deprecated-custom-components`，然后从这个模块中import，即`import { Navigator } from 'react-native-deprecated-custom-components'`.

<img src="https://github.com/yuwanlin/react-native-meituan/raw/master/output/images/show1.png" width="360" height="640">
<img src="https://github.com/yuwanlin/react-native-meituan/raw/master/output/images/show2.png" width="360" height="640">
<img src="https://github.com/yuwanlin/react-native-meituan/raw/master/output/images/show3.png" width="360" height="640">
<img src="https://github.com/yuwanlin/react-native-meituan/raw/master/output/images/show4.png" width="360" height="640">
<img src="https://github.com/yuwanlin/react-native-meituan/raw/master/output/images/show5.png" width="360" height="640">
<img src="https://github.com/yuwanlin/react-native-meituan/raw/master/output/images/show6.png" width="360" height="640">



## 组件

### Image

- 对于source属性，使用uri代替require。
- 图片需要设置宽高。
- 图片有resizeMode属性，用来表示图片的拉伸方式。值为"cover","contain","stretch"。

### Text

- 如果一些属性在IOS和Android平台上不能达到特定的效果，可考虑在Text组件外包一层View组件。TextInput组件也是如此。

### TextInput

- 在Android下会有下划线，使用underlineColorAndroid='transparent'去除下划线。
- returnKeyType属性表示决定“确定”按钮显示的内容（我在IOS和Android下并无效果）。
- returnKeyLabel属性表示决定“确定”按钮显示的内容（在Android设备有效）。
- clearButtonMode属性用来表示输入文字后会否显示清除(x)按钮。

### ScrollView
当分页的时候，在`componentDidMount`中开启定时器，在`componentWillUnmount`中清除定时器。定时器中ScrollView需要滚动到某个位置。使用组件属性scrollTo({x,y,animated})。

- horizontal:表示滚动列表是水平还是竖直。
- showsHorizontalScrollIndicator:表示是否显示一个横向的滚动条。
- showsVerticalScrollIndicator:表示是否显示一个竖向的滚动条。
- bounces:相关属性可以设置在IOS端是否有弹跳效果。
- pagingEnabled:表示是否可以分页，即滚动时是否每次都滚动一页，而不是停在一页中间某个位置。
- scrollEnabled:当值为false的时候，ScrollView不可以滚动。
- onMomentumScrollEnd(function):当滚动的趋势结束的时候调用。此时页面已经停在了新的一页。可以计算出其位移。

```
let x = e.nativeEvent.contentOffset.x;
let y = e.nativeEvent.contentOffset.y;
```

- onScrollBeginDrag(function):手指按到屏幕的时候调用。当在分页的时候，此时需要停止定时器。
- onScrollEndDrag(function):手指离开屏幕的时候。当在分页的时候，此时需要恢复定时器。

```
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
```
### ListView

- dataSource:数据源。

```
// 对于没有头部的情况
constructor(props) {
  super(props);
  this.state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,  
    }).cloneWithRows(['1', '2', '3'])
  }
}


// 对于具有头部的情况
constructor(props) {
  super(props);
  const getSectionHeaderData = (dataBlob, sectionID) => {
    return dataBlob[sectionID];
  };
  const getRowData = (dataBlob, sectionID, rowID) => {
    return dataBlob[sectionID+':'+rowID];
  };

  this.state = {
    dataSource: new ListView.DataSource({
      getRowData: getRowData,
      getSectionHeaderData: getSectionHeaderData,
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })
  }
}

componentDidMount() {
  let carsData = ImageData.data; // 数组，每一个元素都是关于车的对象
  let dataBlob = {};
  let sectionID = [];
  let rowID = [];
  let i, j;
  for(i = 0; i < carsData.length; i++) {
    let carData = carsData[i];
    sectionID.push(i);
    dataBlob[i] = carData.title;
    rowID[i] = [];
    for(j = 0; j < carData['cars'].length; j++) {
      rowID[i].push(j);
      dataBlob[i+':'+j] = carData['cars'][j];
    }
  }
  this.setState({
    dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionID, rowID)
  })
}

// 数据形式如下
{
  "data": [
    {
      "cars": [
        {
          "icon": "m_180_100",
          "name": "AC Schnitzer"
        },
        {
          "icon": "m_92_100",
          "name": "阿尔法·罗密欧"
        }
      ],
      "title": "A"
    },
    {
      "cars": [
        {
          "icon": "m_172_100",
          "name": "巴博斯"
        }
      ],
      "title": "B"
    },
    {
      "cars": [
        {
          "icon": "m_129_100",
          "name": "昌河"
        }
      ],
      "title": "C"
    },
  ]
}
```

- renderRow:每一行的样式。

```
renderRow = (text) => <Text>text</Text>
```

- initialListSize: 指定在组件刚挂载的时候渲染多少行数据。用这个属性来确保首屏显示合适数量的数据，而不是花费太多帧逐步显示出来。

- onEndReached: 到达底部时候出发的函数。
- onEndReachedThreshold: 到达底部的临界值（如果值是100，表明距离底部100像素就触发函数）。
- renderHeader: 所有行数据的头部。
- renderFooter: 所有行数据的尾部。
- renderSeparator: 每一行的间隔（分割线）。
- stickySectionHeadersEnabled: 是否启用粘性标题。
- renderSectionHeader: 粘性头部的样式。
- stickyHeaderIndices: 一个子视图下标的数组，用于决定哪些成员会在滚动之后固定在屏幕顶端。我尝试了没有效果。

```
<ListView
  dataSource={this.state.dataSource}
  renderRow={this.renderRow}
  initialListSize={6}
  onEndReachedThreshold={100}
  onEndReached={() => {alert(1)}}
  renderHeader={this.renderHeader}
  renderFooter={this.renderFooter}
  renderSeparator={this.renderSeparator}
  stickySectionHeadersEnabled={true}
  renderSectionHeader={this.renderSectionHeader}
  stickyHeaderIndices={[0]}
>
```

### TabNavigator(项目作者推荐使用react-navigation)
TabNavigator.Item如下：

```
<TabNavigator.Item
  title={title}
  renderIcon={() => <Image source={{uri: renderIcon}} style={styles.iconStyle}/>}
  renderSelectedIcon={() => <Image source={{uri: renderSelectedIcon}} style={styles.iconStyle}/>}
  selected={this.state.selectedTabBar===selectedTabBar}
  onPress={() => {this.setState({selectedTabBar})}}
  selectedTitleStyle={styles.selectedTitleStyle}
  badgeText={badgeText}
>
```
上述属性很清晰明了。

### Navigator

- configureScene: 一个页面切换到另一个页面的动画。可能的选项有：

```
Navigator.SceneConfigs.PushFromRight (默认)
Navigator.SceneConfigs.FloatFromRight
Navigator.SceneConfigs.FloatFromLeft
Navigator.SceneConfigs.FloatFromBottom
Navigator.SceneConfigs.FloatFromBottomAndroid
Navigator.SceneConfigs.FadeAndroid
Navigator.SceneConfigs.HorizontalSwipeJump
Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
Navigator.SceneConfigs.VerticalUpSwipeJump
Navigator.SceneConfigs.VerticalDownSwipeJump
```

- renderScene: 用来渲染指定路由的场景。调用的参数是路由和导航器。一般除了自定义属性外，都会将navigator也作为路由属性传递。这样，下一个路由就可以通过`this.props.navigator`来操作路由。可能的操作有：

```
getCurrentRoutes() - 获取当前栈里的路由，也就是push进来，没有pop掉的那些。
jumpBack() - 跳回之前的路由，当然前提是保留现在的，还可以再跳回来，会给你保留原样。
jumpForward() - 上一个方法不是调到之前的路由了么，用这个跳回来就好了。
jumpTo(route) - 跳转到已有的场景并且不卸载。
push(route) - 跳转到新的场景，并且将场景入栈，你可以稍后跳转过去
pop() - 跳转回去并且卸载掉当前场景
replace(route) - 用一个新的路由替换掉当前场景
replaceAtIndex(route, index) - 替换掉指定序列的路由场景
replacePrevious(route) - 替换掉之前的场景
resetTo(route) - 跳转到新的场景，并且重置整个路由栈
immediatelyResetRouteStack(routeStack) - 用新的路由数组来重置路由栈
popToRoute(route) - pop到路由指定的场景，在整个路由栈中，处于指定场景之后的场景将会被卸载。
popToTop() - pop到栈中的第一个场景，卸载掉所有的其他场景。
```

- initialRoute: 定义启动时加载的路由。路由是导航栏用来识别渲染场景的一个对象。initialRoute必须是initialRouteStack中的一个路由。initialRoute默认为initialRouteStack中最后一项。

```
<Navigator
  initialRoute={{name, component}}
  configureScene={() => {return Navigator.SceneConfigs.PushFromRight}}
  renderScene={(route, navigator) => {
    let Component = route.component;
    return <Component {...route.passProps} navigator={navigator}/>
  }}
/>
```

### TouchableOpacity

- activeOpacity(number): 按下时的透明度。

### WebView(用于将一个网页运行在app上)

- automaticallyAdjustContentInsets: 是否自动调整嵌入的内容。
- source: 使用uri表示网页的uri。
- javaScriptEnabled: 是否允许js。
- domStorageEnabled: Boolean value to control whether DOM Storage is enabled. Used only in Android.
- decelerationRate(ios): 用户抬起手指后以多快的速度停下来。可选的值有"normal", "fast"。
- onNavigationStateChange: WebView开始或者结束的时候调用。
- startInLoadingState: 强迫WebView加载前加载loading。
- scalesPageToFit: 是否允许内容根据视图(我猜是屏幕？)自动调整以及是否允许用户缩放。

```
<WebView
  automaticallyAdjustContentInsets={false}
  style={styles.webView}
  source={{uri: this.state.url}}
  javaScriptEnabled={true}
  domStorageEnabled={true}
  decelerationRate="normal"
  onNavigationStateChange={this.onNavigationStateChange}
  onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
  startInLoadingState={true}
  scalesPageToFit={this.state.scalesPageToFit}
/>
```

## API

### BackHandler(代替过时的BackAndroid)
只应用于Android。用于定义当用户点击返回键时调用的函数（默认是退出应用）。

```
BackHandler.addEventListener('hardwareBackPress', function() {
  // maybe you want to do like this
  this.props.navigator.pop();
}
```

### Dimensions
用来获取屏幕的宽高以及像素比。需要注意的是，当用户旋转屏幕时，宽高是会改变的。依赖于之前宽高的元素将不再适用。我的方法是通过state变量来标志宽高。每当页面方向改变时，相应改变state属性。对于此，Dimensions有一个方法`Dimensions.addEventListener('change', f => f)`。还有一个方法就是禁止屏幕旋转，需要用到插件`react-native-orientation`。

```
import Dimensions from 'Dimensions';
let totalWidth = Dimensions.get('window').width; // 宽度
let totalHeight = Dimensions.get('window').height; // 高度

class Demo extends Component {
  state = {
    w: totalWidth,
    h: totalHeight
  }
  componentDidMount() {
    Dimensions.addEventListener('change', e => {
      this.setState({
        w: e.window.width,
        h: e.window.height,  
      })
    })
  }
  render() {
    // ...
  }
}
```

暂时就到这里(2017.06.05)。
