// pages/index/luntan1/xiangqing/xiangqing.js
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
    var that =this;
    console.log(options);
   var inf=options.inf;
   console.log(typeof inf);
   inf=JSON.parse(inf);
this.setData({inf:inf});  
this.setData({openid:options.openid});
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
    this.jiazaishuju();

  
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
    this.jiazaishuju();
   
  
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
  getneirong :function(res){
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
      url: 'https://www.gamewan.top/luntan/pinglun/add.php',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: "neirong=" + this.data.neirong + "&time=" + tmp + "&username=" + this.data.username + "&touxiang=" + this.data.touxiang  + "&openid=" + this.data.openid+"&id="+this.data.inf.id,
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
    jiazaishuju:function(){
      var that = this;
    
      var id = this.data.inf.id
      wx.request({
        url: 'https://www.gamewan.top/luntan/pinglun/getinf.php',
        method: 'post',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data:"id="+id,
        success: function (res) {
          console.log(res);
          that.jiexi(res.data);


        }
      })

    },
    jiexi:function(res){
      console.log(res);
      if (typeof res == 'string')
        res = JSON.parse(res.trim());

      var temp = [];
      for (var idx in res) {
        var item = res[idx];
        if (this.data.openid == item.openid)
          item.isdelete = 'delete-yes';
        else
          item.isdelete = 'delete-no';
        item.content = unescape(item.content);
        console.log("内容" + item.content);
        temp.push(item);


      }
      console.log(temp);
      this.setData({ inf_pinglun: temp });


    },
    deleteitem:function(even){
      console.log(even);
      var that = this;
      var shunxu = even.target.dataset.shunxu;
      console.log(shunxu);
      wx.showModal({
        title: '提示',
        content: '您确认要删除么？',
        success: function (res) {
          console.log(res);
          if (res.confirm == true) {
            that.deletedetail(shunxu);

          }
          else
            console.log("傻逼，删除失败");


        }
      });

    },
    deletedetail: function (id) {
      var that = this;
      wx.request({
        url: 'https://www.gamewan.top/luntan/pinglun/delete.php',
        method: 'post',
        data: 'shunxu=' + id + "&openid=" + this.data.openid,
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
    dianzan: function (res) {
      //1.每条加载前检测是否能点赞，查询 like表，不能点赞禁止点击事件
      //2.如果能点赞，点击点赞，访问lun表，like字段加一，like表 like字段由0变1
      //3.重新加载页面，或者仅仅改变this.data.inf[???].like的值
      var that = this;
      var id = res.currentTarget.dataset.id;

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
            var inf =that.data.inf;
            inf.like=issuccess;
            that.setData({inf:inf});
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
})