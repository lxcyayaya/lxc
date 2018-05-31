// pages/image-for-hrb/jianzhi/xiangqing/xiangqing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touxiang: '',
    id:''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      id:options.id
    })
    var that =this;
    wx.request({
      url: 'http://47.95.224.243/ligongyun/search.php',
      method: 'POST',
      data:'id='+that.data.id,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.savedata(res.data);

      }

    })
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo.avatarUrl);
        that.savetouxiang(res.userInfo.avatarUrl);



      },
      fail: function () {
        console.log("获取失败");
      }
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
  
  },
  savetouxiang: function (urltouxiang) {
    this.setData({
      touxiang: urltouxiang
    });

  },
  savedata:function(data){
    console.log(data);
    this.setData(data);
  }
})