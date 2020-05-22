// pages/details/details.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:'',
    title:'',
    unit:'',
    price:0,
    index:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this,type=options.type,index=options.index;
    that.setData({
      image:app.data[type][index].image,
      title:app.data[type][index].title,
      unit:app.data[type][index].unit,
      price:app.data[type][index].price,
      index:index,
    })
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