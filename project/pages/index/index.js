//导航栏变量
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var pic_tip = "../../res/tip.png";

Page({
  data: {
    inputShowed: false,
    inputVal: "",

    //导航栏数据
    tabs: ["可回收垃圾", "有害垃圾", "干垃圾", "湿垃圾"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    picture_tip: pic_tip,


  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
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

  //导航栏
  onLoad: function () {
    //json数据下载和绑定
    var that = this
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