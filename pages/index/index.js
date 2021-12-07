//Page Object
import { request } from "../../request/index"
Page({
  data: {
    swiperList:[],
    categoryList:[],
    floorList:[]
  },
  //options(Object)
  onLoad: function() {
    this.getSwiperList();
    this.getCategoryList();
    this.getFloorList();
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  },
  getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(result=>{
      this.setData({
        swiperList:result.data.message
      })
    })
  },
  getCategoryList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
        categoryList:result.data.message
      })
    })
  },
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
      this.setData({
        floorList:result.data.message
      })
    })
  }
});
  