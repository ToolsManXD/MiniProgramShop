import { request } from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
import { payment } from "../../lib/asyncFunction/ayncWx"
// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    cart: [],
    totalPrice: 0,
    totalNum: 0
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
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter(v => v.checked)
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })

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

  async orderCreate() {
    try {
      const token = wx.getStorageSync("token");
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index'
        });
        return
      } else {
        const header = { Authorization: token };
        const order_price = this.data.totalPrice;
        const consignee_addr = this.data.address.all;
        let goods = [];
        this.data.cart.forEach(v => goods.push({
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price
        }))
        const orderParams = { order_price, consignee_addr, goods };
        const createOrder_result = await request({ url: "/my/orders/create", data: orderParams, method: "POST", header: header });
        let order_number = createOrder_result.data.message.order_number;
        const get_orderResult = await request({ url: "/my/orders/req_unifiedorder", data: { order_number }, method: "POST", header: header });
        let { pay } = get_orderResult.data.message;
        const res = await payment(pay);
        const check_orderResult = await request({ url: "/my/orders/chkOrder", method: 'POST', data: { order_number } })
        console.log(check_orderResult);
      }
    } catch (error) {
      console.log(error);
    }
  }

})