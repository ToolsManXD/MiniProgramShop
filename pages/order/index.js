import { request } from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"

// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    tabs:[
      {
        id:0,
        name:"全部",
        isActive:true
      },{
        id:1,
        name:"待付款",
        isActive:false
      },{
        id:2,
        name:"代发货",
        isActive:false
      },{
        id:3,
        name:"退款/退货",
        isActive:false
      },
    ],
    header:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    const token = wx.getStorageSync("token");
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }
    const header = { Authorization: token };
    this.setData({header:header})
    let pages =  getCurrentPages();
    let currentPages = pages[pages.length-1];
    const {type} = currentPages.options;
    this.changeTitleIndex(type-1)
    this.getOrders(type);
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

  },
  
  changeTitleIndex(index) {
    let tabs = this.data.tabs;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },

  selectChange(e) {
    const index = e.detail;
    this.changeTitleIndex(index);
    this.getOrders(index+1,)
  },

  async getOrders(type) {
    let header = this.data.header
    const res = await request({url:"/my/orders/all",data:{type},header:header});
    this.setData({
      orders:res.data.message.orders
    })
  }
})