Page({
  data: {

  },


  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (res) {
        //console.log(res);
        wx.request({
          url: 'https://www.gamewan.top/getopenid.php',
          method: 'POST',
          data: 'code=' + res.code,
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            //console.log(res);
            var openid = res.data;
            that.setData({ openid: openid });
            //that.jianceshujuku(openid);
          }
        })

      }
    })
    wx.authorize({
      scope: 'scope.userInfo',
    });
    wx.request({
      url: "https://www.gamewan.top/getrd.php",
      method: "get",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.jiexi(res.data);


      }
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
        //console.log(typeof res.data)
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
  jiaowuguanlibind: function () {

    wx.navigateTo({
      url: '/pages/index/jiaowu/jiaowu?openid=' + this.data.openid,
    })
  },
  kaoshichaxunbind: function () {
    wx.navigateTo({
      url: '/pages/index/guojia/guojia',
    })
  },
  xiaoneifudaobind: function () {

    wx.navigateTo({
      url: '/pages/index/xnfd/xnfd',
    })
  },
  xiaoyuanluntanbind: function () {
    wx, wx.navigateTo({
      url: '/pages/index/luntan1/luntan1?openid=' + this.data.openid,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  xiaoneixinwenbind: function () {

    wx.navigateTo({
      url: 'xnxw/news/new',
    })
  },
  xueshenghuodongbind: function () {
    wx.navigateTo({
      url: 'MOS/MOS?openid=' + this.data.openid,
    })

  },
  happyrcbind: function () {
    wx.navigateTo({
      url: 'lzrc/lzrc?openid=' + this.data.openid,
    })
  },
  morebind: function () {
    wx.navigateTo({
      url: 'gywm/gywm',
    })


  },
  jiexi(res) {
    if (typeof res == 'string')
      res = JSON.parse(res.trim());
    var temp = [];
    for (var idx in res) {
      var item = res[idx];
      item.content = unescape(item.content);
      //console.log("内容" + item.content);
      temp.push(item);

    }
    //console.log(temp);
    this.setData({ rdsd: temp });

  },
  haiwaidaigou: function () {
    wx.navigateTo({
      url: 'hwdg/hwdg?openid=' + this.data.openid,
    })
  },
  shangjialianxi: function () {

    wx.navigateTo({
      url: 'sjlx/sjlx',
    })

  },
  zaixiandatibind: function () {
    wx.navigateTo({
      url: 'zxdt/zxdt?openid=' + this.data.openid,
    })
  },
  qiandaochoujiang: function () {

    wx.navigateTo({
      url: 'qdcj/qdcj?openid=' + this.data.openid,
    })

  },
  ershoushichang: function () {
    wx.navigateTo({
      url: 'luntan1/ershou/ershou?openid=' + this.data.openid,
    })
  },
  biyeTap: function () {
    wx.navigateTo({
      url: '/pages/index/garaduate/garaduate',
    })
  },

})