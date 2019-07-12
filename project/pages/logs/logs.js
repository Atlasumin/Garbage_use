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
    console.log(this.data.dataList);
    console.log(this.data.dataList.example);

  }
})
