// pages/index/MOS/MOS.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ['http://www.gamewan.top/img/jiaoshi/pay-top.png',
    'http://www.gamewan.top/img/jiaoshi/pay-bottom.png',
    'http://www.gamewan.top/img/jiaoshi/qun.jpg'],
    
    myprize:true
  

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({openid:options.openid});
    this.getmyprize(this.data.openid);
  
   
  
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
  wechat:function(){
    wx.previewImage({
      current:this.data.url[0],
      urls: this.data.url,
    })



  },
  alipay: function () {
    wx.previewImage({
      current: this.data.url[0],
      urls: this.data.url,
    })



  },
 qun:function () {
    wx.previewImage({
      current: this.data.url[2],
      urls: this.data.url,
    })



  },
  baomingwechat:function(){

    wx.navigateTo({
      url: 'wechat/wechat?openid='+this.data.openid,
    })
  },
  baomingalipay: function () {
    wx.showToast({
      title: '暂未开放',
    })
    return;
    wx.navigateTo({
      url: 'wechat/wechat',
    })
  },
  choujiang:function(){
    wx.showToast({
      title: '暂未开放',
    })
    return;
    var that=this;
    wx.request({
      url: 'https://www.gamewan.top/mos/choujiang/choujiang.php',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: "openid="+this.data.openid,
      success: function (res) {
        console.log(res)
        var data=res.data
        if(data==2){
        wx.showToast({
          title: '只能抽一次哦',
        })
        return;}
        else
        wx.showModal({
          title: "提示",
          content: data,
        })
        that.getmyprize(that.data.openid)


      }
    
    })

  },
  getmyprize:function(openid){
    var that = this;
    wx.request({
      url: 'https://www.gamewan.top/mos/choujiang/getmyprize.php',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: "openid=" + openid,
      success: function (res) {
        console.log(res)
        var data = res.data
        if (typeof data == 'string')
          data = JSON.parse(data)
        if (data.length > 0) {
          console.log(data)
          that.setData({ prize: data[0].name })
          that.setData({ myprize: false })
        }
      }
    })
  },
  alipay1: function () {
    wx.previewImage({
      current: this.data.url[1],
      urls: this.data.url,
    })



  },
})