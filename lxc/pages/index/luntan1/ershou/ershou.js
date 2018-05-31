Page({
  data: {
    isHideLoadMore: false,
    count: 10,
    key: '',
    itemlist: [],
    sh: 1000


  },
  onLoad: function (res) {
    this.setData({ openid: res.openid });
    console.log(res);
    this.jiazai();
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        var height = 750 * res.screenHeight / res.screenWidth;
        height = height - 250;
        that.setData({ sh: height });
      },
    })
  },

  onShow: function (options) {
    this.jiazai ();
  },
  onPullDownRefresh: function () {
    this.setData({ inf: '' });
    this.setData({ count: 10 });
    this.jiazai();

  },



  addbind: function () {
    wx.navigateTo({
      url: "fabu/fabu?openid=" + this.data.openid
    })
  },
  jiexi: function (res) {
    var imglist = [];
    if (typeof res == 'string')
      res = JSON.parse(res.trim());
    var temp = [];

    console.log(typeof res);
    for (var idx in res) {
      var item = res[idx];
      console.log(item);

      if (this.data.openid == item.openid)
        item.isdelete = 'delete-yes';
      else
        item.isdelete = 'delete-no';
      //console.log("item信息:"+item.pic1);
      item.pic1height = 690 * parseInt(item.pic1height) / parseInt(item.pic1width);
      item.pic1width = 690;
      item.name = unescape(item.name);
      item.content = unescape(item.content);
      item.title = unescape(item.title);
      imglist.push(item.pic1);
      temp.push(item);
    }

    this.setData({ inf: temp });
    this.setData({ imglist: imglist });
    this.setData({ isHideLoadMore: true });
    console.log(temp);

  },
  delitem: function (res) {
    var that = this;

    var id = res.target.dataset.id;
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
      url: 'https://www.gamewan.top/tp/delete.php',
      method: 'post',
      data: 'id=' + id + "&openid=" + this.data.openid,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res);
        if (res.data == 1) {
          wx.showToast({
            title: '删除成功',
          })
          that.jiazai();
        }
        else {
          wx.showToast({
            title: '删除失败',
          })
        }



      }

    })
  },
  jiazai: function () {
    this.setData({ isHideLoadMore: false });
    var that = this;

    wx.request({
      url: "https://www.gamewan.top/tp/getinf.php",
      method: 'get',
      success: function (res) {
        console.log(res.data);
        that.jiexi(res.data);


      }
    })
  },
  chakanimg: function (res) {
    var curr = res.currentTarget.dataset.imgurl
    wx.previewImage({
      urls: this.data.imglist,
      current: curr
    })
  },
  xialashuaxin: function () {
    this.setData({ isHideLoadMore: false });
    var that = this;
    wx.request({
      url: 'https://www.gamewan.top/tp/getinf.php',
      method: 'POST',
      data: 'from=' + this.data.count,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data);
        var count = that.data.count + 10;
        console.log(count);
        that.setData({ count: count });
        setTimeout(function () { that.jiexi2(res.data) }, 2000);



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
      item.pic1height = 690 * parseInt(item.pic1height) / parseInt(item.pic1width);
      item.pic1width = 690;
      item.name = unescape(item.name);
      item.content = unescape(item.content);
      item.title = unescape(item.title);

      temp.push(item);

    }
    console.log(temp);
    this.setData({ inf: temp });
    this.setData({ isHideLoadMore: false });




  },
  onBindchange: function (res) {
    var text = res.detail.value;
    this.setData({ key: text })

    if (this.data.key.length != 0) {
      this.setData({ inf: '' })
      var that = this;
      wx.request({
        url: 'https://www.gamewan.top/tp/searchitem.php',
        method: 'post',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: 'key=' + text,
        success: function (res) {
          that.jiexi(res.data)
        }
      })
    }


  },
  makecall: function (event) {
    // var that = this;
    console.log(event)
    var postId = event.currentTarget.dataset.postid;
    wx.makePhoneCall({
      phoneNumber: "" ,//+ that.data.title,
      complete: function (res) {
        console.log(postId);
      }
    })
  },
  makephone:function(res){
    console.log(res)
    var phone = res.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  }
});