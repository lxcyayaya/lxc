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
    this.setData({openid:options.openid});

      var that = this;

      wx.login({
        success: function (res) {
          console.log(res);
          wx.request({
            url: 'https://www.gamewan.top/getopenid.php',
            method: 'POST',
            data: 'code=' + res.code,
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              console.log(res);
              var openid = res.data;
              that.jianceshujuku(openid);
            }
          })

        }
      })
      wx.authorize({
        scope: 'scope.userInfo',
      });



    
  },
  jianceshujuku: function (res) {
    var openid = res;
    this.setData({ openid: openid });

    wx.request({
      url: 'https://www.gamewan.top/jiaowu/openid/search.php',
      method: 'post',
      data: 'openid=' + openid,
      header: { 'Content-Type': ' application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(typeof res.data)
        if (typeof res.data == 'object') {

          if (res.data == null) {
            //屏蔽跳转绑定页面

            wx.navigateTo({
              url: '/pages/index/more/login?openid=' + openid,
            })
          }


        }
        else {
          res.data = res.data.trim();


          if (res.data == 'null') {
            //屏蔽跳转绑定页面

            wx.navigateTo({
              url: '/pages/index/more/login?openid=' + openid,
            })

          }

        }



        /*
            if (res.data.openid != openid)
              wx.navigateTo({
                url: '/pages/index/more/login?openid=' + openid,
              })
              */


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
  cxkb:function(){
   wx.navigateTo({
     url: 'classtable/classtable?openid=' + this.data.openid,
   })
  

  },
  question:function(){
    wx.showModal({
      title: '提示',
      content: '点击确认清除所有缓存，然后重新尝试获取',
      success:function(res){
        console.log(res);
        if(res.confirm==true)
        {wx.clearStorage();
        wx.showToast({
          title: '清除成功',
        })

        }
      

      }
    })
   
     
  },
  cxcj:function(){
    wx.navigateTo({
      url: 'cj/cj?openid='+this.data.openid,
    })

  },
  cxksdd:function(){
    wx.navigateTo({ 
      url: 'ksdd/ksdd?openid='+this.data.openid,
    })
  }
})