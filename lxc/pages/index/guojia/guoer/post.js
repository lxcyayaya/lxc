// pages/posts/post.js

Page({

  /**
   * 页面的初始数据
   */
  data: {name:'',
  idcard:''
  
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
  bind:function(){
    if(this.data.idcard.length<18){
      wx.showToast({
        title: '身份证号不对',
      })
      return;
    }
    wx.navigateTo({
      url: 'result/result?idcard='+this.data.idcard,
    })
  },
  passidInput:function(res){
  
    this.setData({ idcard: res.detail.value })
    

  }
})