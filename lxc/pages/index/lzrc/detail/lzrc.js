// pages/index/lzrc/lzrc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:10,
    isHideLoadMore:false,
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
        that.setData({ name: res.userInfo.nickName })

      },
      fail: function () {
        console.log("获取失败");
      }
    })
    wx.request({
      url: 'https://www.gamewan.top/lzrc/search.php',
      method: 'POST',
      data: 'id=' + options.id ,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res);
        that.detail(res.data);
       
       

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
  detail:function(data){
    if (typeof data == 'string')
      data = JSON.parse(data.trim());
    this.setData({ inf1: data });
    console.log(this.data);
    var temp=[];

      temp.push(data.pic1);
      temp.push(data.pic2);
      temp.push(data.pic3);
      temp.push(data.pic4);
      temp.push(data.twocode);
      this.setData({url:temp});


    

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
  xialashuaxin:function(){
    this.setData({ isHideLoadMore: true });
    var that = this;
    wx.request({
      url: 'https://www.gamewan.top/'+this.data.inf1.table+'/getinf.php',
      method: 'POST',
      data: 'from=' + this.data.count,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data);
        var count = that.data.count + 10;
        console.log(count);
        that.setData({ count: count });
        //setTimeout(function () { that.jiexi2(res.data) }, 2000);



      }
    })


  },
  jiazaishuju: function () {
    var that = this;
    wx.request({
      url: 'https://www.gamewan.top/'+this.data.inf1.table+'/getinf.php',
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data);
        that.jiexi(res.data);

      }
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
      item.name = unescape(item.name);
      console.log("内容" + item.content);
      temp.push(item);

    }
    console.log(temp);
    this.setData({ inf: temp });
    this.setData({ isHideLoadMore: true });


  },
  getneirong:function(e){
    this.setData({ content: e.detail.value})
  },


    fabiao: function () {

      var that = this;
      if (this.data.content.length <= 5) {
        wx.showToast({
          title: '你这个长度也太短了吧',
        })
        return;
      }


      var tmp = Date.parse(new Date()).toString();
      var name=escape(this.data.name);
      var content=escape(this.data.content);
      wx.request({
        url: 'https://www.gamewan.top/'+this.data.inf1.table+'/add.php',
        method: 'post',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: "content=" +content + "&time=" + tmp + "&name=" +name + "&touxiang=" + this.data.touxiang + "&openid=" + this.data.openid,
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
    deleteitem:function(even){
     
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
        url: 'https://www.gamewan.top/'+this.data.inf1.table+'/delete.php',
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
    one:function(){
      wx.previewImage({
        current: this.data.url[0],
        urls: this.data.url,
      })
    },
    two: function () {
      wx.previewImage({
        current: this.data.url[1],
        urls: this.data.url,
      })
    },
    three: function () {
      wx.previewImage({
        current: this.data.url[2],
        urls: this.data.url,
      })
    },
    four: function () {
      wx.previewImage({
        current: this.data.url[3],
        urls: this.data.url,
      })
    },
    phone:function(){
      wx.makePhoneCall({
        phoneNumber: this.data.inf1.phone,
      })
    },
    ercode:function(){
      wx.previewImage({
        current:this.data.url[4],
        urls: this.data.url,
      })

    }
})