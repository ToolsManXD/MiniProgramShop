import { request } from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
import { login } from "../../lib/asyncFunction/ayncWx"
// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mockData:{
        "user_id": 23,
        "user_email_code": null,
        "is_active": null,
        "user_sex": "男",
        "user_qq": "",
        "user_tel": "",
        "user_xueli": "本科",
        "user_hobby": "",
        "user_introduce": null,
        "create_time": 1562221487,
        "update_time": 1562221487,
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      }
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

  async handleGetUserInfo(e){
    try {
    // const {encryptedData,rawData,iv,signature} = e.detail;
    // const { code } = await login();
    // const loginParams = {encryptedData,rawData,iv,signature,code}
    // const res = await request({url:"/users/wxlogin",data:loginParams,method:"POST"})
    const { token } = this.data.mockData;
    wx.setStorageSync("token", token);
    wx.navigateBack({
      delta:1
    });
    } catch (error) {
      console.log(error);
    }
  }
})