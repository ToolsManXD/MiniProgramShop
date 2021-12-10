import {request} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    // console.log(goods_id);
    this.getGoodsDetail({goods_id});
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

  async getGoodsDetail({goods_id}) {
    const result = await request({url:'/goods/detail',data:{goods_id}})
    this.setData({
      goodsDetail:result.data.message
    })
    // console.log(result);
  },

  handleImagePreview(e) {
    const urls = this.data.goodsDetail.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },

  handleAddCart() {
    let cart = wx.getStorageSync("cart")||[];
    let index = cart.findIndex(v=>v.goods_id===this.data.goodsDetail.goods_id)
    if(index===-1) {
      this.data.goodsDetail.num = 1;
      cart.push(this.data.goodsDetail)
    } else {
      cart[index].num++
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    });
  }
})