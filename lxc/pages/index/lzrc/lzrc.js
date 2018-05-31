Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ openid: options.openid });
    var that=this;
    wx.request({
      url: "https://www.gamewan.top/lzrc/getinf.php",
      method: "get",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data);
        that.jiexi(res.data);


      }
    });
    
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


    jiexi: function(data) {
      console.log(data);
      if (typeof data == 'string')
        data = JSON.parse(data.trim());
      this.setData({ inf: data });


    },
    todetail:function(res){
      var id=res.currentTarget.dataset.id;
      wx.navigateTo({
        url: 'detail/lzrc?id='+id+"&openid="+this.data.openid,
      })

    }
  
})