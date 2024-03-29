Page({
  data: {
    //img: '../../images/1.jpg'
  },
  uploadf: function (path) {
    //let result = false;
    let name = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
    wx.cloud.uploadFile({
      cloudPath: name,
      filePath: path, // 文件路径
    }).then(res => {
      // get resource ID
      let id = res.fileID;
      console.log('fileid:' + id)
      //调用云函数识别图片
      wx.cloud.callFunction({
        name: 'photo2know',
        data: {
          fileID: id
        }
      }).then(res => {
        console.log('cloud')
        console.log(res)
      }).catch(err => {
        console.log(err)
      });

    }).catch(error => {
    });
   },

  chooseWxImage: function (type) {
    let tempFiles;
    let tempFilePaths;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        tempFiles = res.tempFiles[0].size;
        tempFilePaths = res.tempFilePaths[0];
        if (tempFiles > 4000000) {//大于3m
          wx.showToast({
            title: '图片大小大于4M',
            icon: 'none',
            duration: 2000
          });
          return;
        }
        wx.showLoading({
          title: '识别中'
        });
        this.uploadf(tempFilePaths);
        setTimeout(function () {
          wx.hideLoading();
        }, 3000);
      }
    });
  },

  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#a3a2a2",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })

  },

})