// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[],
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
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
    const cart = wx.getStorageSync("cart")||[];
    // const allChecked = cart.length?cart.every(v=>v.checked):false;
    this.setCart(cart)
    this.setData({
      address,
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

  getAddress() {
    wx.chooseAddress({
      success: (result)=>{
        const address = result;
        address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
        wx.setStorageSync("address", address);
      }
    });
  },

  handleItemChange(e){
    const goods_id = e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;

    this.setCart(cart);
  },

  setCart(cart) {
    wx.setStorageSync("cart",cart);
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked) {
        totalPrice += v.num*v.goods_price;
        totalNum +=v.num
      } else {
        allChecked = false;
      }
    })
    allChecked = cart.length!=0?allChecked:false;

    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
  },

  handleAllXChange() {
    let {allChecked,cart} = this.data;
    allChecked = !allChecked;
    cart.forEach(v=>v.checked = allChecked);
    this.setCart(cart); 
  },

  handleNumEdit(e) {
    const {operation,id} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v=>v.goods_id === id);
    if(cart[index].num===1&&operation===-1) {
      wx.showModal({
        title: '提示',
        content: '是否要删除',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if(result.confirm){
            cart.splice(index,1);
            this.setCart(cart);
          }
        },
      });
    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }
  },

  handlePay() {
    const {address,totalNum} = this.data;
    if(!address.userName) {
      wx.showToast({
        title: '您尚未设置地址信息',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
      });
      return
    } 
    if(totalNum === 0) {
      wx.showToast({
        title: '您的购物车为空',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
})