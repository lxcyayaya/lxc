// pages/index/qdcj/qdcj.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "这是一个可以滚动的字，当文字比屏幕宽时这条文字就会滚动起来，很神奇  但是具体我看不懂，也不好懂",
    marqueePace: 1,//滚动速度
    marqueeDistance: 30,//初始滚动距离
    marquee_margin: 300,
    size: 14,
    interval: 20 // 时间间隔
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid=options.openid
    this.setData({openid:openid})
    var that=this;
    wx.request({
      url: 'https://www.gamewan.top/qiandao/getmd.php',
      method:'get',
      header: { 'content-type': 'application/x-www-form-urlencoded'},
      success:function(res){
        console.log(res.data)
      var data=res.data
       if(typeof data=='string')
       data=JSON.parse(data.trim())
       var text=''
       for(var idx in data){
         text = text + '获奖学号：' + data[idx].username + "      奖品：" + data[idx].mingcheng+"   "
       }
       that.setData({text:text})



      }
    })
    this.getdays()
   
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
    var that = this;
    var length = that.data.text.length * that.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    //console.log(length,windowWidth);
    that.setData({
      length: length,
      windowWidth: windowWidth
    });
    that.scrolltxt();// 第一个字消失后立即从右边出现
  
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  scrolltxt: function () {
    var that = this;
    var length = that.data.length;//滚动文字的宽度
    var windowWidth = that.data.windowWidth;//屏幕宽度
    if (length > windowWidth) {
      var interval = setInterval(function () {
        var maxscrollwidth = length + that.data.marquee_margin;
        //滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
        var crentleft = that.data.marqueeDistance;
        if (crentleft < maxscrollwidth) {
          //判断是否滚动到最大宽度
          that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
          })
        }
        else {
          //console.log("替换");
          that.setData({
            marqueeDistance: 0
            // 直接重新滚动
          });
          clearInterval(interval);
          that.scrolltxt();
        }
      }, that.data.interval);
    }
    else {
      that.setData({ marquee_margin: "1000" });//只显示一条不滚动右边间距加大，防止重复显示
    }
  },
  qiandaoTap:function(){
    var that=this
    wx.request({
      url: 'https://www.gamewan.top/qiandao/add.php',
    method: 'post',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data:'openid='+this.data.openid,
    success:function(res){
      res.data=res.data.trim();
     if(res.data=='签到成功'){
       wx.showModal({
         title: '提示',
         content: '签到成功',
       })
       that.getdays();

     }
     else
     {
       wx.showModal({
         title: '提示',
         content: '已经签到或者签到失败',
       })
     }
    }

    })

  },
  getdays:function(){
    var that=this;
    wx.request({
      url: 'https://www.gamewan.top/qiandao/getdays.php',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: 'openid=' + this.data.openid,
      success: function (res) {
        that.setData({ days: res.data })
      }

    })



  },
  choujiangTap:function(){
    if(this.data.days<7){
      wx.showModal({
        title: '提示',
        content: '未从周一签到满七天',
      })
      //return;
    }
    wx.request({
      url: 'https://www.gamewan.top/qiandao/choujiang1.php',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: 'openid=' + this.data.openid,
      success: function (res) {
       wx.showModal({
         title: '提示',
         content: res.data,
       })
      }

    })


  },
  myprize:function(){
    wx.navigateTo({
      url: 'myprize/myprize?openid='+this.data.openid,
    })

  }


})