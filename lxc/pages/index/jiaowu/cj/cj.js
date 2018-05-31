Page({
  data: {
    openid: '',
    remind: '加载中',
    isHideLoadMore: false,
    yzmbox: true,
    autoyzmswitch: false//是否自动获取验证码开关



  },
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (res) {
        var that1 = this;
        wx.request({
          url: 'https://www.gamewan.top/getopenid.php',
          method: 'POST',
          data: 'code=' + res.code,
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            console.log(res.data);
            var openid = res.data;
            that.loaddata(res.data);
          }
        })

      }
    })










  },
  loaddata: function (openid) {
    this.setData({ openid: openid });
    var that = this;

    wx.request({
      url: 'https://www.gamewan.top/jiaowu/openid/getinfo.php',
      method: 'POST',
      header: { 'Content-Type': ' application/x-www-form-urlencoded' },
      data: 'openid=' + this.data.openid,
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
        //getyzm()自动获取验证码函数
        if (that.data.autoyzmswitch == true)//自动获取验证码
          that.getyzm();
        else {
          that.getyzmtp();
          that.setData({ yzmbox: false });
        }


      },

    })





  },
  jiexishuju: function (str) {
    this.setData({ isHideLoadMore: true });
    this.setData({ yzmbox: true });
    this.setData({ cjtable: str });
    console.log(this.data.cjtable);


  },
  jiexi: function (data) {
    console.log(data);
    console.log(typeof data);
    if (typeof data == 'string') {
      data = data.trim();

      if (data == 'true') {

        this.getcj();


      }
      else {

        this.onLoad();
        return;
      }




    }
    else {
      {
        if (data == true) {

          this.getcj();



        }
        else {
          this.setData({ yzmbox: false });
          this.setData({ yzm: '' });
          this.onLoad();

          return;
        }

      }
    }
  },
  getyzm: function () {
    var that = this;
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
        console.log(res);
        that.jiexi(res.data);
      }
    })

  },
  getcj: function () {
    var that = this;
    wx.request({
      url: 'https://www.gamewan.top/jiaowu/chengji.php',
      method: 'post',
      header: { 'Content-Type': ' application/x-www-form-urlencoded' },
      data: 'username=' + this.data.username,
      success: function (res) {
        console.log(res.data);
        that.jiexishuju(res.data);

      }
    })

  },
  yzm: function (e) {
    //获得输入验证码
    console.log(e);
    this.setData({ captcha: e.detail.value });
  },
  getyzmtp: function () {
    var that = this;
    wx.request({
      url: 'https://www.gamewan.top/jiaowu/getimg1.php?username=' + this.data.username,
      method: 'GET',
      success: function (res) {
        console.log(res);
        var data = res.data;
        if (typeof data == 'string') {
          data = data.trim();
        }

        that.setData({ yzmtx: data });





      }
    })


  }
  ,
  tijiao: function () {
    this.setData({ yzmbox: true });
    this.loginbind();

  }

})