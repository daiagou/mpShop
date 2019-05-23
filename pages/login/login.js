// pages/login/login.js

const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    code: ''
  },

  onGotUserInfo(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)

    this.setData({
      userInfo: e.detail.userInfo
    });
    wx.setStorageSync('userInfo', e.detail.userInfo);
    getApp().userInfo = e.detail.userInfo
    console.log(this.data.userInfo);

    var _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          console.log(res)
          _this.data.code = res.code;
          getApp().code = res.code;

          wx.request({
            url: config.getOpenId,
            // method: 'POST',
            // header: { 'content-type': 'application/json' },
            data: { code: res.code},
            success: function (res) {
              console.log(res.data)// 服务器回包内容
              if (res.data.status != 0 ) {
                wx.showToast({ title: res.data.message })
              }else{
              
                wx.setStorageSync('code', _this.data.code);
                console.log(_this.data.code)
                if (_this.data.code) {
                  wx.reLaunch({
                    url: '/pages/shop/shop'
                  })
                }
              }


            }
          })






        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(getApp().globalData)
    this.data.userInfo = wx.getStorageSync('userInfo');
    this.data.code = wx.getStorageSync('code');
    console.log(this.data)
    if (this.data.code){
      getApp().globalData.code = this.data.code
      getApp().globalData.userInfo = this.data.userInfo
      console.log(getApp().globalData)
      wx.reLaunch({
        url: '/pages/shop/shop'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
