// pages/me/me.js

const util = require('../../utils/util.js')
const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    cancelOrderId: '',
    createdOrderList: [],
    dealingOrderList: [],
    finishedOrderList: [],

    orderList: [],
  },


  menuClick: function(e) {
    this.setData({
      _num: e.target.dataset.num
    })
    this.loadOrders(e.currentTarget.dataset.key);


  },



  loadOrders(orderStatus){
    var _this = this;
    wx.request({
      url: config.queryOrdersByCode,
      data: { code: getApp().globalData.code, orderStatus: orderStatus },
      success: function (res) {
        console.log(res.data)// 服务器回包内容
        if (res.data.status != 0) {
          wx.showToast({ title: res.data.message })
        } else {
          
          if (res.data.data){
            _this.setData({ orderList: res.data.data });
          }else{
            _this.setData({ orderList: {} });
          }

        }


      }
    })


  },



  onGotUserInfo(e) {

    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)

    this.setData({
      userInfo: e.detail.userInfo
    });
    console.log(this.data.userInfo);
  },

  seeOrderDetail(e) {

    console.log("seeOrderDetail")
    console.log(e.currentTarget.dataset.item)

    wx.setStorageSync("detailData", e.currentTarget.dataset.item)


    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail',
    })




  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(getApp().globalData)
    var userInfo = getApp().globalData.userInfo;
    this.setData({
      userInfo
    })

    this.loadOrders('CREATED');//默认加载一个订单列表
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
    console.log(this.data.cancelOrderId);
    if (this.data.cancelOrderId){
      this.loadOrders('CREATED');//有一个订单取消了。重新加载一下
    }
    this.setData({

      cancelOrderId:''
    })
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
