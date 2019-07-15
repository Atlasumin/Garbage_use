Page({
  data: {
    //img: '../../images/1.jpg'
  },
  onLoad: function (path) {
    let result = false;
    let name = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
    wx.cloud.uploadFile({
      cloudPath: name,
      filePath: path, // 文件路径
    }).then(res => {
      // get resource ID
      let id = res.fileID;
      //调用云函数识别图片
      wx.cloud.callFunction({
        name: 'photo2know',
        data: {
          fileID: id
        }
      }).then(res => {
        let result = res.result.words_result;
        if (result.length > 0) {
          let arr = '';
          for (let i = 0; i < result.length; i++) {
            arr += result[i].words
          }
          this.setData({
            words_result: arr
          })
        } else {
          this.setData({
            words_result: ''
          })
        }
        //删除图片
        wx.cloud.deleteFile({
          fileList: [id]
        }).then(res => {
          // handle success
        }).catch(error => {
          // handle error
        })
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
        this.uplaodF(tempFilePaths);
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