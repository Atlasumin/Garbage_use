'use strict';
cloud.init();

const cloud = require('wx-server-sdk')
var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;
const args = require("conf.js");
wx.cloud=true;

// 云函数入口函数
exports.main = async (event, context) => {
  // 设置APPID/AK/SK
  let APP_ID = args.APP_ID;
  let API_KEY = args.API_KEY;
  let SECRET_KEY = args.SECRET_KEY;
  // 新建一个对象，保存一个对象调用服务接口
  var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);
  let fileID = event.fileID;
  let res = await cloud.downloadFile({
    fileID: fileID,
  })
  let image = res.fileContent.toString("base64");
  // 调用通用文字识别, 图片参数为远程url图片


  return await client.advancedGeneral(image).then(function (result) {
    //console.log('get result ok')
    return result;
  }).catch(function (err) {
    // 如果发生网络错误
    //console.log('get result fail');
    console.log(err);
    return result
  });


  /*
  return client.generalBasic(image);
  console.log(result);
   then(function (result) {
     let result = JSON.stringify(result);
     return result;
   })
   */
}