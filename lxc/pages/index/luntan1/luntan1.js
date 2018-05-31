// pages/index/luntan1/luntan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fabiao: '',
    count: 10, 
    sh:800

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ openid: options.openid });

    var that = this;


    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo.avatarUrl);
        that.setData({ touxiang: res.userInfo.avatarUrl })
        that.setData({ username: res.userInfo.nickName })





      },
      fail: function () {
        console.log("获取失败");
      }
    })

    wx.request({
      url: 'https://www.gamewan.top/jiaowu/openid/search.php',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: 'openid=' + this.data.openid,
      success: function (res) {


        var res1 = res.data;
        console.log(typeof res1);
        if (typeof res1 == 'string') {
          console.log("进入res==string")
          var username = JSON.parse(res1.trim());


          if (username != null) {

            username = username.username;
            console.log(username);
          }
          else {
             username = undefined;
          }


        }
        else {
       
          if (res1 == null) {var username = undefined;}
          
          else
            var username = res1.username;



        }












        console.log(username);
        that.setData({ user: username });

        that.jiazaishuju();



      }
    })
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        var height=750*res.screenHeight/res.screenWidth;
        height=height-500;
        that.setData({sh:height});
      },
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
    this.setData({ isHideLoad:false });
    this.setData({inf:null});
    this.setData({count:10});
    this.jiazaishuju();
    wx.stopPullDownRefresh();
   

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (op) {

  },

  zhaolingxinxi: function () {
    wx.showToast({
      title: '暂未开放',
    })
    return;
    wx.navigateTo({
      url: 'shiwuzhaoling/index/index',
    })
  },
  jiexi: function (res) {
    console.log(res);
    if (typeof res == 'string')
      res = JSON.parse(res.trim());
    var temp = [];
    for (var idx in res) {
      var item = res[idx];
      console.log(item.openid + this.data.openid);

      if (this.data.openid == item.openid)
        item.isdelete = 'delete-yes';
      else
        item.isdelete = 'delete-no';
      item.content = unescape(item.content);
      item.username = unescape(item.username);
      console.log("内容" + item.content);
      temp.push(item);

    }
    console.log(temp);
    this.setData({ inf: temp });
    this.setData({ isHideLoad: true });


  },

  getneirong: function (res) {




    this.setData({ neirong: escape(res.detail.value) });

  },
  fabiao: function () {
  
    var that = this;
    if (this.data.neirong.length <= 5) {
      wx.showToast({
        title: '你这个长度也太短了吧',
      })
      return;
    }


    var tmp = Date.parse(new Date()).toString();
    wx.request({
      url: 'https://www.gamewan.top/luntan/add.php',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: "neirong=" + this.data.neirong + "&time=" + tmp + "&username=" + escape(this.data.username) + "&touxiang=" + this.data.touxiang + "&user=" + this.data.user + "&openid=" + this.data.openid,
      success: function (res) {
        console.log(res);
        that.jiazaishuju();
        if (res.data = '1') {
          wx.showToast({
            title: '发表成功!',
          })
          that.setData({ fabiao: '' });


        }



      }
    })
  },
  jiazaishuju: function () {
    var that = this;
    wx.request({
      url: 'https://www.gamewan.top/luntan/getinf.php',
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data);
        that.jiexi(res.data);


      }
    })
  },
  deleteitem: function (even) {
    console.log(even);
    var that = this;
    var id = even.target.dataset.id;
    console.log(id);
    wx.showModal({
      title: '提示',
      content: '您确认要删除么？',
      success: function (res) {
        console.log(res);
        if (res.confirm == true) {
          that.deletedetail(id);

        }
        else
          console.log("傻逼，删除失败");


      }
    });

  },
  deletedetail: function (id) {
    var that = this;
    wx.request({
      url: 'https://www.gamewan.top/luntan/delete.php',
      method: 'post',
      data: 'id=' + id + "&openid=" + this.data.openid,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res);
        if (res.data == 1) {
          wx.showToast({
            title: '删除成功',
          })
          that.jiazaishuju();
        }
        else {
          wx.showToast({
            title: '删除失败',
          })
        }



      }

    })


  },
  zhuanfa: function () {


  },
  dianzan: function (res) {
    //1.每条加载前检测是否能点赞，查询 like表，不能点赞禁止点击事件
    //2.如果能点赞，点击点赞，访问lun表，like字段加一，like表 like字段由0变1
    //3.重新加载页面，或者仅仅改变this.data.inf[???].like的值
    var that = this;
    var id = res.currentTarget.dataset.id;
    var idx = res.currentTarget.dataset.index;

    var issuccess;

    wx.request({
      url: 'https://www.gamewan.top/luntan/like.php',
      method: 'post',
      data: 'id=' + id + "&openid=" + this.data.openid,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res);
        issuccess = res.data;
        console.log(issuccess);
        if (issuccess != 'F') {
          var param = {};
          console.log(that.data.inf[idx]);
          var str = "inf[" + idx + "].like";
          param[str] = issuccess;
          console.log(param);
          that.setData(param);
          wx.showToast({
            title: '成功赞了他一下',
          })

        }
        else {
          wx.showToast({
            title: '赞过了啊',
            icon: 'loading'
          })
        }
      }

    })



  },
  xiangqing: function (res) {

    var idx = res.currentTarget.dataset.idx;
    console.log();

    wx.navigateTo({
      url: 'xiangqing/xiangqing?inf=' + JSON.stringify(this.data.inf[idx]) + "&openid=" + this.data.openid,
    })

  },
  xialashuaxin:function(){
    console.log('下拉')
    this.setData({ isHideLoadMore: true });
    var that = this;
    wx.request({
      url: 'https://www.gamewan.top/luntan/getinf.php',
      method: 'POST',
      data:'from='+this.data.count,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data);
        var count=that.data.count+10;
        console.log(count);
        that.setData({count:count});
        setTimeout(function(){that.jiexi2(res.data)},2000);
        


      }
    })
    

  },
  jiexi2: function (res) {
    if (typeof res == 'string')
      res = JSON.parse(res.trim());
    var temp = this.data.inf;
    for (var idx in res) {
      var item = res[idx];
      console.log(item.openid + this.data.openid);

      if (this.data.openid == item.openid)
        item.isdelete = 'delete-yes';
      else
        item.isdelete = 'delete-no';
      item.content = unescape(item.content);
      item.username = unescape(item.username);
      console.log("内容" + item.content);
      temp.push(item);

    }
    console.log(temp);
    this.setData({ inf: temp });
    this.setData({ isHideLoadMore:false});


  },
  xinling:function(){
    wx.showToast({
      title: '暂未开放',
    })
  },
  ershou:function(){
   

    
    wx.navigateTo({
      url: 'ershou/ershou?openid='+this.data.openid,
    })
  },
  diannao:function(){
    wx.navigateTo({
      url: 'dnwx/dnwx',
    })
  },
  dayin:function(){
   wx.navigateTo({
     url: 'dy/dy',
   })
  }
})