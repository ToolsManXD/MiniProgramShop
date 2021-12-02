import { request } from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftBarList:[],
    rightBrandList:[],
    currentIndex:0,
    scrollTop:0
  },

  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const cates = wx.getStorageSync("cates");
    if(!cates) {
      this.getCateList();
    } else {
      if(Date.now()-cates.time>1000*60*5) {
        this.getCateList();
      }else {
        this.Cates = cates.data
        let leftBarList = this.Cates.map(v=>v.cat_name)
        let rightContent = this.Cates[0].children;
        this.setData({
          leftBarList: leftBarList,
          rightBrandList:rightContent
        })
      }
    }
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

  },

  async getCateList(){
    const result = await request("/categories");
    this.Cates = result.data.message
    wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
    let rightContent = this.Cates[0].children;
    this.setData({
      leftBarList:this.Cates.map(v=>v.cat_name),
      rightBrandList:rightContent
    })
  },
  
  handleItemTap(e) {
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightBrandList:rightContent,
      scrollTop:0
    })
  }
})