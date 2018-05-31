// pages/index/jiaowu/ksdd/ksdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    isHideLoadMore:false,
    ishidetitle:true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (res) {
        var that1=that;
        wx.request({
          url: 'https://www.gamewan.top/getopenid.php',
          method: 'POST',
          data: 'code=' + res.code,
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            console.log(res.data);
            var openid = res.data;
           that1.loaddata(res.data);
          }
        })

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
  loaddata:function(openid){
    var that=this;
    /*
    if (that.data.openid == '') {
      var openid = options.openid;
      that.setData({ openid: openid });
    }
    else
      var openid = that.data.openid;
      */
      this.setData({openid:openid});

    wx.request({
      url: 'https://www.gamewan.top/jiaowu/openid/getinfo.php',
      method: 'POST',
      header: { 'Content-Type': ' application/x-www-form-urlencoded' },
      data: 'openid=' + openid,
      success: function (res) {
        if (typeof res.data == 'object') {
          if (res.data == null) {
            wx.showModal({
              title: '提示',
              content: '暂未绑定，重洗进入程序来绑定',
              success: function (res) {
                wx.reLaunch({
                  url: '/pages/index/index',
                })

              }
            })
          }

        }
        else {
          if (res.data == 'null') {
            //屏蔽跳转绑定页面

            wx.showModal({
              title: '提示',
              content: '暂未绑定，重洗进入程序来绑定',

              success: function (res) {
                wx.reLaunch({
                  url: '/pages/index/index',
                })

              }
            })


          }

        }
        var data = res.data;
        if (typeof data == 'string')
          data = JSON.parse(data.trim());
        console.log(typeof data);
        that.setData({ username: data.username })
       


      }
    })


    wx.getStorage({
      key: 'ksplace',
      success: function (res) {
        console.log(res.data)

        if (res.data) {
          that.setData({ ksplace: res.data });
          that.setData({ isHideLoadMore: true });

        }



      },
      fail: function () {

        that.denglu(openid);


      }
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
  denglu: function (res) {
    var openid = res;
    var that = this;

    wx.request({
      url: 'https://www.gamewan.top/jiaowu/openid/getinfo.php',
      method: 'POST',
      header: { 'Content-Type': ' application/x-www-form-urlencoded' },
      data: 'openid=' + openid,
      success: function (res) {
        if (typeof res.data == 'object') {

          if (res.data == null) {
            wx.showModal({
              title: '提示',
              content: '暂未绑定，重洗进入程序来绑定',
              success: function (res) {
                wx.reLaunch({
                  url: '/pages/index/index',
                })

              }
            })
          



          }


        }
        else {



          if (res.data == 'null') {
            //屏蔽跳转绑定页面

            wx.showModal({
              title: '提示',
              content: '暂未绑定，重洗进入程序来绑定',
              success: function (res) {
                wx.reLaunch({
                  url: '/pages/index/index',
                })

              }
              
            })
            


          }

        }
        
        console.log(res);
        var data = res.data;
        if (typeof data == 'string')
          data = JSON.parse(data.trim());
        console.log(typeof data);
        console.log(data);
        that.setData({ username: data.username })
        that.setData({ password: data.password })
        // that.yzmbind();
        that.getyzm();




      }
    })
  },
  getyzm: function () {
    var that = this;
    console.log(this.data.captcha);

    console.log("进入");
    wx.request({
      url: 'https://www.gamewan.top/jiaowu/getimg.php?username=' + this.data.username,
      method: 'GET',
      success: function (res) {
        console.log(res);
        //that.setData({ yzmtp: res.data });
        that.setData({ captcha: res.data });
        if (res.data != '')
          that.loginbind();
        if (res.data == '')
          that.getyzm();
      }

    })
  },
  loginbind: function () {
    var that = this;

  

    wx.request({
      url: 'https://www.gamewan.top/jiaowu/login.php',
      method: 'POST',
      header: { 'Content-Type': ' application/x-www-form-urlencoded' },
      data: 'yzm=' + this.data.captcha + '&username=' + this.data.username + '&password=' + this.data.password,
      success: function (res) {
        console.log('yzm=' + that.data.captcha + '&username=' + that.data.username + '&password=' + that.data.password);
        that.jiexi(res.data);
      }
    })

  },
  jiexi: function (data) {
    console.log(data);
    console.log(typeof data);
    if (typeof data == 'string') {
      data = data.trim();

      if (data == 'true') {
       
        this.getplace();


      }
      else {
      
        this.onLoad();
        return;
      }




    }
    else {
      {
        if (data == true) {
         
          this.getplace();



        }
        else {
          
          this.onLoad();
          return;
        }

      }
    }
  },
  getplace: function () {
    var that = this;
    wx.request({
      url: 'https://www.gamewan.top/jiaowu/getplace.php',
      method: 'post',
      header: { 'Content-Type': ' application/x-www-form-urlencoded' },
      data: 'username=' + this.data.username,
      success: function (res) {
        console.log(res.data);
        that.jiexididian(res.data);


      }
    })

  },
  jiexididian:function(res){
    if (typeof res == 'string')
      res = JSON.parse(res.trim());
if(res.length==0){
this.setData({title:'无安排'})
  this.setData({ ishidetitle:false})
  this.setData({ isHideLoadMore: true });
return;

}
    wx.setStorage({
      key: 'ksplace',
      data: res,
    })
    var that = this;
    wx.getStorage({
      key: 'ksplace',
      success: function (res) {
        if (res.data) {
          that.setData({ ksplace: res.data });
          that.setData({ isHideLoadMore:true});
        
        }


  }})}

})