//导航栏变量
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var pic_tip = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEg0lEQVRYR8VXXWhbZRh+vqSbP1vTrOAoq9ifgElkc+nmCoq4zGzrkEEbr3Yh/fFmoIN2XlkvtvXGXOk2meDV0hS9TiYiNFvXn0HVKLZlg2Rl2iis6AZbaJAhm+eT53i+kJ9zcnJ64wsfSc55v/d93uf9+b4I/M8iNuF/AMBeAOGyvXMAlgFccWqvUQBeAKMAxgDw+zyAvLE6AXAdBFAAcAHAReO7LZ5GAIQAJAHsAHAOwKSFcQIjO9RpAXDIYKUuCDsApJnOGfFwmWM+Z9QEUy0EQhaGAIxY6JT21APAyGeNvNI5hSk4a6RhBQB1rESBqMtEPQAsLOaUtDKq8wCiRnQ0znd2kjIKtstK0QoAI44D4EYWG6kmEFLPam9UCJz7yZxZumAFgE64CIROmYoeh84VSLLVbwRTA9wMAItrzaCbFHKRblUHjUav9FgnS2VsVuw3A6AiVu9kGRinzpW+pQ0zAMwXe5n5q4teZo91akIbFRAhQHoBUZACeRfknPCnE2VomU4ySbu2DJBqVjwHj6nItbBX/r01Ppd5OBAKNMPr2WKmlxdCnhb+NB2zo7gaAlCdggrjMnssLIWWBITXFZjG9akDCPe2WqZGCky6/dMMynQo1asB1YIl43L1SEhqYpbO+bARAIWNx2jtvU51DiSyYJsCKrB32T5cFL0btGzfufz6o453x2/hzCkf3hz8EZ+O+/H1zH39MxT0IHXtT3w29bvODGUyeRenP87hxpevvPNy//dfNQqAjnm6sfd1AFu3iCPjJ7ufXckVkbp2D53tzyB/9xG8niYUNp4gFGxGf2QnEsl1dLQ/jdmpXn1jz8Ci/i4e273sCqSVvRIOq0HEWcDKJRC9I17fvyN7c7XYxp1nT/kwn3moAyCQ/sM79SgprAe+JxsXEnl8ELuNX2fe0PWES+sRL16tmKT1zgI1jjn/U1ruaGEyud5C+pVBFQbz3H14AWfe92FsiNiB5ewG9kW/01Ojngkho0ZX2DKgFDi/eayOabk+vR4ODWYgIEo55rOR8ZuYyzzA2gyz9l/eCXQougvx2J6SMynlhDuYrmhFu/sAN+tMDEd34XJsj+6Ixafar/r3xKU7mLj0S0XkCsFmAXB/yLO9aWnk7Xac/yigR8waYCrICIVFpyK/HNuN4Wh7dcFjMykoGfli4qUfPvxktfdBJgLmvCuygJ6gR2dE1URXZB6jgx2lnNe0nMMirNh/+5vX3vMfX/z85+SreoUrqumQrLAjuiMLUO9rwodccQXSNTeoRmqg3JZUua8GoGpBy/XV+gZM6aeiYwBX4/v/8r2wbdu+6CIOHmjFlZl7etSF4hO9OM0ASCkT7mDa9D7hGIBnu/vO3kBz542fCk0cOoycn4XiYyxnizUAJHDRHZjmEW/OjNULi+e8WCRampv+OPFW20Dbc0/5lR5rgGO4xIDEb8Ilx6oHT01hbgJA6VTTLyTQhgUQ/nbh/vPHTy75/skeTbhcSNk5Vn4dp8C43fK0rBbOYObZkU1HymbnuQmQ8j+ttgQ7BWBr0KnCv+KtrjANaUjAAAAAAElFTkSuQmCC";

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
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  //导航栏
  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }


});