// pages/buy/buy.js
var hasClick = false;


const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    formData: {
      customer: '',
      phone: '',
      address: '',
      comment: '',
      toBuyGoods: {},
    },
    customerData: {
      customer: '',
      phone: '',
      address: '',
      comment: ''

    }

  },

  buy() {
    if (hasClick) {
      return
    }
    hasClick = true
    
    var _this = this;
    wx.showLoading()

    var formData = this.data.formData
    formData.customer = this.data.customerData.customer;
    formData.phone = this.data.customerData.phone;
    formData.address = this.data.customerData.address;
    formData.comment = this.data.customerData.comment;

    formData.code = wx.getStorageSync('code');


    

    wx.request({
      url: config.buy,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: formData,
      success: function(res) {
        console.log(res.data) // 服务器回包内容
        if (res.data.status != 0) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
          hasClick = false
        } else {
          wx.showToast({
            title: '下单成功',
            icon: 'success',
            duration: 2000
          })
          wx.setStorageSync('cartData',null);
          setTimeout(function () {
            wx.navigateBack()
            hasClick = false
          }, 2000)

 
          


        }
      },
      complete: function(res) {
        wx.hideLoading()
       
      }
    })

  },

  //实时获取input输入
  changeValue(e) {
    const name = e.currentTarget.dataset.name;
    this.setData({
      [name]: e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var toBuyGoods = wx.getStorageSync('toBuyGoods');
    var formData = this.data.formData;
    formData.toBuyGoods = toBuyGoods;
    this.setData({
      formData
    })

    var customerData = wx.getStorageSync('customerData');
    if (customerData) {
      this.setData({
        customerData
      })
    }
    console.log("on show")
    console.log(customerData)





  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

    console.log("on hide")



  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("on onUnload")
    console.log(this.data.customerData)
    wx.setStorageSync('customerData', this.data.customerData);
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