//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    captcha_focus: false,
    userid: '',
    passwd: '',
    yzmtp: '',
    angle: 0
  },
  onLoad: function (res) {

    this.setData({ openid: res.openid });
    console.log(this.data.openid);


  },
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
  bind: function () {
    var _this = this;
    var that = this;

    if (!_this.data.userid || !_this.data.passwd) {
      wx.showToast({
        title: '账号及密码不能为空',
        icon: '',
        image: '',
        duration: 0,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      // app.showErrorModal('账号及密码不能为空', '提醒');
      return false;
    }


    wx.showToast({
      title: '绑定中',
    })
    console.log("登录开始");
    this.getyzm();
   
    

  },
  useridInput: function (e) {
    this.setData({
      userid: e.detail.value
    });
    if (e.detail.value.length >= 10) {
      wx.hideKeyboard();
    }
  },
  passwdInput: function (e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  captchaInput: function (e) {
    console.log(e);
    this.setData({
      captcha: e.detail.value
    });
  },
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    }
    if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
    if (e.target.id == 'captcha') {
      this.setData({
        'captcha_focus': true
      });
    }

  },
  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    }
  },
  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  },
  getyzm: function () {
    var that = this;



    wx.request({
      url: 'https://www.gamewan.top/jiaowu/getimg.php?username=' + this.data.userid,
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
  loginbind:function(){
    var that=this;
    wx.request({
      url: 'https://www.gamewan.top/jiaowu/login.php',
      method: 'post',
      header: { 'content-type': ' application/x-www-form-urlencoded ' },
      data: 'yzm=' + this.data.captcha + '&username=' + this.data.userid + '&password=' + this.data.passwd,
      success: function (res) {
        console.log(res.data);  

        that.jiexi(res.data);

      }

    })

  },
  jiexi: function (data) {
    console.log(typeof data);
    if (typeof data == 'string') {
      data = data.trim();

      if (data == 'true') {
        wx.showToast({
          title: '登录成功',
        });
        this.shangchuanshuju();


      }
      else{
        wx.showToast({
          title: '登录失败',
        });
        this.bind();}




    }
    else {
      {
        if (data == true) {
          wx.showToast({
            title: '登录成功',
          });
          this.shangchuanshuju();


        }
        else{
          wx.showToast({
            title: '登录失败',
          });
          this.bind();}

      }
    }

    /* var studentid = this.getstudentid(data);
     console.log(studentid);
     console.log(typeof studentid);  
 
     
     if (studentid.length == 6)
      { wx.showToast({
         title: '登录成功',
       });
       this.setData({studentid:studentid});
       this.shangchuanshuju();
 
 
   
 
       }
     else
       wx.showToast({
         title: '登录失败',
       });
       */



  },
  getstudentid: function ($string) {
    var $qianmian = 'studentid="';
    var $houmian = '" year="';
    return $string.substring($string.indexOf($qianmian) + $qianmian.length, $string.indexOf($houmian));

  },
  shangchuanshuju: function () {
    var that = this;
    wx.request({
      url: 'https://www.gamewan.top/jiaowu/openid/add.php',
      method: 'POST',
      header: { 'Content-Type': ' application/x-www-form-urlencoded' },
      data: 'username=' + this.data.userid + '&password=' + this.data.passwd + '&openid=' + this.data.openid,
      success: function (res) {
        console.log(res.data);
        console.log(typeof res.data);

        if (typeof res.data == 'string') {
          res.data = res.data.trim();
          //安卓
          if (res.data == '1') {
            wx.showToast({
              title: '绑定成功',
            })
            //that.huoqukebiao();
            wx.navigateBack({

            })

          } else
            wx.showToast({
              title: '绑定失败',
            })

        }
        else {
          //苹果
          if (res.data == 1) {
            wx.showToast({
              title: '绑定成功',
            })
            // that.huoqukebiao();
            wx.navigateBack({

            })
          } else
            wx.showToast({
              title: '绑定失败',
            })

        }





      }

    })

  },
  huoqukebiao: function () {
    var that = this;
    var studentid = that.data.studentid;
    console.log(studentid);
    wx.request({
      url: 'https://www.gamewan.top/jiaowu/getclass.php',
      method: 'POST',
      data: 'studentid=' + studentid + '&username=' + this.data.userid,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res);
        that.jiexikebiao(res.data);

      }

    })


  },
  jiexikebiao: function (str) {

    console.log(str);
    console.log(typeof str);
    //var zzbds = '<td id="(.*?)" class="center">(.*?)</td >';
    var zzbdswb = new RegExp('<td id="(.*?)" class="center">(.*?)</td>', 'mg');
    //var result= zzbdswb.exec(str);
    var result = str.match(zzbdswb);
    console.log(result);
    var classtable = [];
    for (var idx in result) {
      var item = result[idx];
      // console.log(item);
      var emptyclass = new RegExp('&nbsp;');
      var zzbds = new RegExp('<td id="(.*?)" class="center">&lt;&lt;(.*?)&gt;&gt;;.*<br>(.*?)<br>(.*?)<br>(.*?)<br>(.*?)</td>');
      if (!emptyclass.test(item)) {

        var temp1 = item.match(zzbds);
        console.log(temp1);
        var temp = {
          classtime: temp1[1],
          classname: temp1[2],
          classplace: temp1[3],
          classweek: temp1[5],
        };
        // console.log(temp);
        classtable.push(temp);
      }
      else {
        var kzzbd = new RegExp('<td id="(.*?)" class="center">&nbsp;</td>');
        var temp2 = item.match(kzzbd);
        var temp = {
          classtime: temp2[1],
          classname: '',
          classplace: '',
          classweek: ''
        };
        classtable.push(temp);
      }

    }
    //console.log(classtable);
    this.setData({ classtable: classtable });

    wx.setStorage({
      key: 'classtable',
      data: classtable,
    })
    wx.showToast({
      title: '获取课表成功',
    })
    wx.navigateBack({

    })


  },
  shangchuankebiao: function () {
    wx.request({
      url: 'https://www.gamewan.top/classtable/add.php',
      method: 'POST',
      header: { 'Content-Type': ' application/x-www-form-urlencoded' },
      data: 'openid=' + this.data.openid + '&username=' + this.data.userid + '&c1_1_c=' + this.classtable[0].classname + '&c1_1_p=' + this.classtable[0].classplace + '&c1_1_t=' + this.classtable[0].classweek + + '&c1_2_c=' + this.classtable[14].classname + '&c1_2_p=' + this.classtable[14].classplace + '&c1_2_t=' + this.classtable[14].classweek + '&c1_3_c=' + this.classtable[28].classname + '&c1_3_p=' + this.classtable[28].classplace + '&c1_3_t=' + this.classtable[28].classweek + '&c1_4_c=' + this.classtable[42].classname + '&c1_4_p=' + this.classtable[42].classplace + '&c1_4_t=' + this.classtable[42].classweek + '&c1_5_c=' + this.classtable[56].classname + '&c1_5_p=' + this.classtable[56].classplace + '&c1_5_t=' + this.classtable[56].classweek + '&c2_1_c=' + this.classtable[1].classname + '&c2_1_p=' + this.classtable[1].classplace + '&c2_1_t=' + this.classtable[1].classweek + '&c2_2_c=' + this.classtable[15].classname + '&c2_2_p=' + this.classtable[15].classplace + '&c2_2_t=' + this.classtable[15].classweek + '&c2_3_c=' + this.classtable[29].classname + '&c2_3_p=' + this.classtable[29].classplace + '&c2_3_t=' + this.classtable[29].classweek + '&c2_4_c=' + this.classtable[43].classname + '&c2_4_p=' + this.classtable[43].classplace + '&c2_4_t=' + this.classtable[43].classweek + '&c2_5_c=' + this.classtable[57].classname + '&c2_5_p=' + this.classtable[57].classplace + '&c2_5_t=' + this.classtable[57].classweek + '&c3_1_c=' + this.classtable[2].classname + '&c3_1_p=' + this.classtable[2].classplace + '&c3_1_t=' + this.classtable[2].classweek + '&c3_2_c=' + this.classtable[16].classname + '&c3_2_p=' + this.classtable[16].classplace + '&c3_2_t=' + this.classtable[16].classweek + '&c3_3_c=' + this.classtable[30].classname + '&c3_3_p=' + this.classtable[30].classplace + '&c3_3_t=' + this.classtable[30].classweek + '&c3_4_c=' + this.classtable[44].classname + '&c3_4_p=' + this.classtable[44].classplace + '&c3_4_t=' + this.classtable[44].classweek + '&c3_5_c=' + this.classtable[58].classname + '&c3_5_p=' + this.classtable[58].classplace + '&c3_5_t=' + this.classtable[58].classweek + '&c4_1_c=' + this.classtable[3].classname + '&c4_1_p=' + this.classtable[3].classplace + '&c4_1_t=' + this.classtable[3].classweek + '&c4_2_c=' + this.classtable[17].classname + '&c4_2_p=' + this.classtable[17].classplace + '&c4_2_t=' + this.classtable[17].classweek + '&c4_3_c=' + this.classtable[31].classname + '&c4_3_p=' + this.classtable[31].classplace + '&c4_3_t=' + this.classtable[31].classweek + '&c4_4_c=' + this.classtable[45].classname + '&c4_4_p=' + this.classtable[45].classplace + '&c4_4_t=' + this.classtable[45].classweek + '&c4_5_c=' + this.classtable[59].classname + '&c4_5_p=' + this.classtable[59].classplace + '&c4_5_t=' + this.classtable[59].classweek + '&c5_1_c=' + this.classtable[4].classname + '&c5_1_p=' + this.classtable[4].classplace + '&c5_1_t=' + this.classtable[4].classweek + '&c5_2_c=' + this.classtable[18].classname + '&c5_2_p=' + this.classtable[18].classplace + '&c5_2_t=' + this.classtable[18].classweek + '&c5_3_c=' + this.classtable[32].classname + '&c5_3_p=' + this.classtable[32].classplace + '&c5_3_t=' + this.classtable[32].classweek + '&c5_4_c=' + this.classtable[46].classname + '&c5_4_p=' + this.classtable[46].classplace + '&c5_4_t=' + this.classtable[46].classweek + '&c5_5_c=' + this.classtable[60].classname + '&c5_5_p=' + this.classtable[60].classplace + '&c5_5_t=' + this.classtable[60].classweek + '&c6_1_c=' + this.classtable[5].classname + '&c6_1_p=' + this.classtable[5].classplace + '&c6_1_t=' + this.classtable[5].classweek + '&c6_2_c=' + this.classtable[19].classname + '&c6_2_p=' + this.classtable[19].classplace + '&c6_2_t=' + this.classtable[19].classweek + '&c6_3_c=' + this.classtable[33].classname + '&c6_3_p=' + this.classtable[33].classplace + '&c6_3_t=' + this.classtable[33].classweek + '&c6_4_c=' + this.classtable[47].classname + '&c6_4_p=' + this.classtable[47].classplace + '&c6_4_t=' + this.classtable[47].classweek + '&c6_5_c=' + this.classtable[61].classname + '&c6_5_p=' + this.classtable[61].classplace + '&c6_5_t=' + this.classtable[61].classweek + '&c7_1_c=' + this.classtable[1].classname + '&c7_1_p=' + this.classtable[1].classplace + '&c7_1_t=' + this.classtable[1].classweek + '&c7_2_c=' + this.classtable[1].classname + '&c7_2_p=' + this.classtable[1].classplace + '&c7_2_t=' + this.classtable[1].classweek + '&c7_3_c=' + this.classtable[1].classname + '&c7_3_p=' + this.classtable[1].classplace + '&c7_3_t=' + this.classtable[1].classweek + '&c7_4_c=' + this.classtable[1].classname + '&c7_4_p=' + this.classtable[1].classplace + '&c7_4_t=' + this.classtable[1].classweek + '&c7_5_c=' + this.classtable[1].classname + '&c7_5_p=' + this.classtable[1].classplace + '&c7_5_t=' + this.classtable[1].classweek,
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: '获取课表成功',
          icon: '',
          image: '',
          duration: 0,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }

    })


  }


});