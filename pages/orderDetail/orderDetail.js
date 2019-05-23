// pages/orderDetail/orderDetail.js


const config = require('../../config')
var hasClick = false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData:{}
  },


  askIfCancel(e){

    var _this = this;

    wx.showModal({

      title: '',

      content: '确定取消么?',

      confirmText: '确定',

      cancelText: '取消',

      success: function (res) {

        if (res.confirm) {

          console.log('用户点击主操作')

          _this.cancelOrder(e);

        } else if (res.cancel) {

          console.log('用户点击次要操作')

        }

      }

    })

  


  },


  cancelOrder(e){

    if(hasClick){
      return
    }
    hasClick = true;

    var orderNo = e.currentTarget.dataset.key;

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      cancelOrderId: e.currentTarget.dataset.key
    })

    var _this = this;
    wx.request({
      url: config.cancelOrder,
      // method: 'POST',
      // header: { 'content-type': 'application/json' },
      data: { orderNo: orderNo },
      success: function (res) {
        console.log(res.data)// 服务器回包内容
        if (res.data.status != 0) {
          wx.showToast({ title: res.data.message })
          hasClick = false
        } else {
          wx.showToast({
            title: '取消订单成功',
            icon: 'success',
            duration: 2000
          })
          wx.setStorageSync('cartData', null);
          setTimeout(function () {  
            wx.navigateBack()
            hasClick = false
          }, 2000)

        }


      }
    })



   

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var detailData = wx.getStorageSync("detailData");
    console.log(detailData)
    this.setData({ detailData})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})