import {request} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"

// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        name:"综合",
        isActive:true
      },{
        id:1,
        name:"销量",
        isActive:false
      },{
        id:2,
        name:"价格",
        isActive:false
      },
    ],
    goodsList:[]
  },

  QueryParams:
    {
      query:'',
      cid:'',
      pagenum:1,
      pagesize:10
    },

  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
    // console.log(options);
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
    this.setData({
      goodsList:[]
    });
    this.QueryParams.pagenum = 1;
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QueryParams.pagenum>=this.totalPages) {
      wx.showToast({title:'没有更多数据了'})
    } else {
      this.QueryParams.pagenum++;
      console.log(this.QueryParams.pagenum);
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  selectChange(e) {
    const index = e.detail;
    let tabs = this.data.tabs;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  async getGoodsList() {
    const result = await request({url:"/goods/search",data:this.QueryParams})
    let goodsList = result.data.message.goods;
    //totalNum当前类目下的数据总数
    let totalNum = result.data.message.total;
    //当前类目的总页数totalPages = 总条目totalNum / 页容量this.QueryParams.pagesize
    this.totalPages = Math.ceil(totalNum/this.QueryParams.pagesize);
    this.setData({
      goodsList:[...this.data.goodsList,...goodsList]
    })
    // console.log(result);
    // console.log(goodsList);
    // console.log('get到的数据总条数',typeof(totalNum),totalNum)
    // console.log('每页条数',this.QueryParams.pagesize);
    // console.log('总页数',this.totalPages);

    wx.stopPullDownRefresh();
  }
})