// pages/shop/shop.js

const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    listData:[],
    navList: [],
    // input默认是1  
    num: 0,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled' ,
    status: 0,

      hasList:true,          // 列表是否有数据
      totalPrice:0,           // 总价，初始为0
      obj:{
          name:"hello"
      }

  },


  seeGoodsDetail(e){
    var goods = e.currentTarget.dataset.item;
    console.log(goods)
    if (!goods.detailPicUrl1){
      wx.showToast({
        title: '木有详情',
        icon:'none'
      })
      return;
    }
    wx.setStorageSync("goodsDetail", goods)
    wx.navigateTo({
      url: '/pages/goodsDetail/goodsDetail',
    })
  },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

      
      //获取缓存中的数据，同步已经选购的数量
      var cartData = wx.getStorageSync('cartData')
      
      if (cartData) {
        for (var item in this.data.listData) {
          for (var i = 0; i < this.data.listData[item].length; i++) {
            var temp = this.data.listData[item][i];
            if (cartData[temp.id]) {
              temp.goodsCount = cartData[temp.id].goodsCount;
            }
          }
        }
        this.setData({
          listData: this.data.listData
        })

      }else{

        this.loadGoodsList();
      }

     
      
   
    },

  /* 点击减号 */
  bindMinus: function (e) {

    console.log(e.currentTarget.dataset.key)
    console.log(e.currentTarget.dataset.index)
    
    var key = e.currentTarget.dataset.key;
    var index = e.currentTarget.dataset.index

    if (this.data.listData[key][index].goodsCount>0){
      this.data.listData[key][index].goodsCount--
    }

    this.setData({
      listData: this.data.listData
    })


    this.calcShopCartData(this.data.listData[key][index]);

  },
  /* 点击加号 */
  bindPlus: function (e) {
    console.log(e.currentTarget.dataset.key)
    console.log(e.currentTarget.dataset.index)

    var key = e.currentTarget.dataset.key;
    var index = e.currentTarget.dataset.index
    this.data.listData[key][index].goodsCount++
    

    this.setData({
      listData: this.data.listData
    })


    this.calcShopCartData(this.data.listData[key][index]);

  },


  /**
   * 计算应该放到购物车中的数据
   */
  calcShopCartData: function (item){
    var temp = wx.getStorageSync('cartData')
    var cartData = temp?temp:{};
    cartData[item.id] = item;
    if(item.goodsCount==0){
      delete cartData[item.id];
    }
    wx.setStorageSync('cartData', cartData);
    console.log(cartData);
  },


  /* 输入框事件 */
  bindManual: function (e) {
    // var num = e.detail.value;
    // // 将数值与状态写回  
    // this.setData({
    //   num: num
    // });
  },  

  getStatus(e) {
    this.setData({ status: e.currentTarget.dataset.index })
  },



  loadGoodsList() {
    var _this = this;
    wx.showLoading()
    wx.request({
      url: config.queryGoodsInfosList,
      data: {  },
      success: function (res) {
        console.log(res.data)// 服务器回包内容
        if (res.data.status != 0) {
          wx.showToast({ title: res.data.message })
        } else {
          console.log(_this.data)

         
          var tempNavList = [];
          for (var key in res.data.data) {
            tempNavList.push(key);
          }
          _this.setData({
            navList: tempNavList
          })


        

          _this.setData({
            listData: res.data.data
          })
          



        }
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('cartData',null);//清空购物车缓存
    this.loadGoodsList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
