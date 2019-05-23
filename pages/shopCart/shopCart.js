// pages/shopCart/shopCart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    isCartEmpty: false,


    totalAmount: 0,
    cartGoodsList: [],

    formData: {
      customer: '',
      phone: '',
      address: '',
      comment: '',
      toBuyGoods: {},
    },





  },

  toBuy: function () {
    wx.setStorageSync('toBuyGoods', this.data.formData.toBuyGoods);
    wx.navigateTo({
      url: '/pages/buy/buy',
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
    var cartData = wx.getStorageSync('cartData');
    var isCartEmpty = true;
    var cartGoodsList = [];
    var totalAmount = 0;
    var toBuyGoods = {};
    var formData = {};
    if (cartData) {

      isCartEmpty = false;

     
      for (var key in cartData) {//key是id，value是goods对象
        cartGoodsList.push(cartData[key]);
        totalAmount += cartData[key].goodsCount * cartData[key].price;
        toBuyGoods[key] = cartData[key].goodsCount;
        formData.toBuyGoods= toBuyGoods;
      }
      this.setData({
        cartGoodsList,
        totalAmount,
        formData
      })


    }

    if (totalAmount==0){
      isCartEmpty = true;

    }

    this.setData({isCartEmpty})

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