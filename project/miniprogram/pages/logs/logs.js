//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function (options) {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })

    let item = JSON.parse(options.jsonStr);
    let title = options.first + "：" + item.className;
    this.setData({dataList:item});
    this.setData({title:title});

  },
  previewImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgArr = e.currentTarget.dataset.srcset;
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})
