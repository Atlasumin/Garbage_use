//导航栏变量
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var pic_tip = "../../res/tip.png";

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    isShowHis: false,
    hisData: [],

    //导航栏数据
    tabs: ["可回收垃圾", "有害垃圾", "干垃圾", "湿垃圾"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    picture_tip: pic_tip,


  },
  showInput: function () {
    var that = this;
    //从微信存储中读取历史数据
    wx.getStorage({
      key: 'hisData',
      success(res) {
        console.log(res.data)
        that.setData({
          hisData: res.data,
        })
      }
    })
    this.setData({
      inputShowed: true,
      //如果点击了输入框，弹出历史搜索
      isShowHis: true,
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      isShowHis: false,
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  //isLike用于判断两个字符串中有没有相同的字，如果有，则返回true
  isLike: function (str1, str2) {
    if (str1 === str2) {
      return true;
    }
    for (var i = 0; i < str1.length; i++) {
      if (str2.indexOf(str1[i]) != -1) {
        return true;
      }
    }
    for (var i = 0; i < str2.length; i++) {
      if (str1.indexOf(str2[i]) != -1) {
        return true;
      }
    }
    return false;
  },

  search: function (e) {
    //准备数据
    let keywords = e.currentTarget.dataset.keywords;
    let src = this.data.src;
    let result = {};

    //遍历src，调用isLike，将结果按照分类标准放入一个结果对象中。
    for (var k in src) {
      //这一层遍历大分类，并将查询数据整合到result
      var bigClass = {};
      bigClass['detail'] = [];
      for (var k2 in src[k]['detail']) {
        //这一层遍历小分类，并将查询数据整合到bigClass
        var smallClass = {};
        smallClass['example'] = [];
        var oneDetail = src[k]['detail'][k2];
        for (var k3 in oneDetail['example']) {
          //这一层遍历一个小分类中的所有关键词，并将查询结果整合到smallClass中
          var str = oneDetail['example'][k3];
          if (this.isLike(keywords, str) == true) {
            smallClass['example'].push(str);
          }
        }
        if (smallClass['example'].length != 0) {
          smallClass['name'] = oneDetail['className'];
          bigClass['detail'].push(smallClass);
        }
      }
      if (bigClass['detail'].length != 0) {
        bigClass['name'] = src[k]['name'];
        result[k] = bigClass;
      }
    }

    //跳转页面到搜索结果，发送数据\
    let srcStr = JSON.stringify(src);
    let jsonStr = JSON.stringify(result);
    //清理当前输入框的内容并保存内容到历史记录中。
    this.clearInput();
    this.hideInput();
    let tempList = this.data.hisData;
    if (tempList.indexOf(keywords) != -1) {//当历史记录中有当前搜索的内容时，将该内容前移
      tempList.splice(tempList.indexOf(keywords), 1);
      tempList.unshift(keywords);
    } else {//当历史记录中没有时，判断数组元素是否到了6个，如果到了就删除最后一个记录，将新记录插入第一个位置
      if (tempList.length >= 6) {
        tempList.pop();
      }
      tempList.unshift(keywords);
    }
    wx.setStorage({
      key: "hisData",
      data: tempList,
    })


    wx.navigateTo({
      url: '../search_result/search_result?srcStr=' + srcStr + '&jsonStr=' + jsonStr + '&keywords=' + keywords,
    })
  },

  //导航栏
  onLoad: function () {
    //json数据下载和绑定
    var that = this

    /*
    wx.request({
      url: 'https://www.233yo.cn/trash.json', //json数据地址
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data)
        //console.log(res.data.imgListData[0].tag)
        //将获取到的json数据，存在名字叫list_data的这个数组中
        that.setData({
          src: res.data,
          page1_data: res.data.recyclable,
          page2_data: res.data.hazardous,
          page3_data: res.data.household,
          page4_data: res.data.residual,
          //res代表success函数的事件对，data是固定的，imgListData是上面json数据中imgListData
        })
        //console.log(res.data.recyclable)
        //console.log(res.data.recyclable.detail[0])
      }
    })
    */


    wx.cloud.init({
      env: 'zucc31601345-3t3em'
    })
    const db = wx.cloud.database({
      env:'zucc31601345-3t3em'
    })
    db.collection('test').doc('wVBqJ34VPpRtLOWaV4k4QHq4eO2BaA2RaK3CV17URns1yqpG').get({
      success: function (res) {
        //将获取到的json数据，存在名字叫list_data的这个数组中
        that.setData({
          src: res.data,
          page1_data: res.data.recyclable,
          page2_data: res.data.hazardous,
          page3_data: res.data.household,
          page4_data: res.data.residual,
          //res代表success函数的事件对，data是固定的，imgListData是上面json数据中imgListData
        })
      }
    })





    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //点击单个细分分类后的事件，用于跳转和传参
  toDetail: function (e) {
    let title = e.currentTarget.dataset.title;
    console.log(title);
    let str = JSON.stringify(e.currentTarget.dataset.all);
    wx.navigateTo({
      url: '../logs/logs?jsonStr=' + str + '&first=' + title,
    })

  },


});