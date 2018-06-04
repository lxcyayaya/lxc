Page({
  data: {
    //下面是一个bool值用来判断是否现在正在加载中。
    isHideLoadMore: false,
    //默认每次加载十条数据。
    count: 10,
    key: '',
    itemlist: [],
    //下面是默认的屏幕高度
    sh: 1000,
    inf:[],
  },

  //页面初始化函数，，首先把上个页面传来的openid给数据绑定上。在页面初始化中调用加载函数，
  //因为
  onLoad: function (res) {
    this.setData({ openid: res.openid });
    //console.log(res);
    this.jiazai();
    var that = this
//下面的api是获得客户端屏幕信息。
    wx.getSystemInfo({
      success: function (res) {
        //console.log(res);
        var height = 750 * res.screenHeight / res.screenWidth;
        height = height - 250;
        that.setData({ sh: height });
      },
    })
  },


//下面这个函数是在页面被隐藏，或者navgate到下一个子页面，
//然后返回这个页面才会调用的函数，进来函数后，调用一次加载函数，
//这样就能实现发布完实时实现看到自己发布的东西
  onShow: function (options) {
    this.jiazai ();
  },

//下面是搜索框点击函数。。
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
    else {
      wx.showToast({
        title: '逗我玩呢！'
      })
    }
  },

  //下面是一个顶部下拉刷新函数，但是现在并没有用。wxml文件中并没有调用这个函数的语句
  onPullDownRefresh: function () {
    this.setData({ inf: '' });
    this.setData({ count: 10 });
    this.jiazai();
  },


// 下面是一个点击发布后实现的功能，跳转到下一个页面。
  addbind: function () {
    wx.navigateTo({
      url: "fabu/fabu?openid=" + this.data.openid
    })
  },


  

  //下面是删除函数，下面仅仅是一个确认删除功能，真正请求服务器是在里面又调用了一个函数。
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
          console.log("SB，删除失败")
      }
    });
  },

//下面这个是详细删除的函数。
  deletedetail: function (id) {
    var that = this;
    wx.request({
      url: 'https://www.gamewan.top/tp/delete.php',
      method: 'post',
      data: 'id=' + id + "&openid=" + this.data.openid,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        //console.log(res);
        if (res.data == 1) {
          wx.showToast({
            title: '删除成功',
          })
          // 删除完再次调用加载函数
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


  //下面是一个加载函数。
  jiazai: function () {
    this.setData({ isHideLoadMore: false });
    var that = this;
    wx.request({
      url: "https://www.gamewan.top/tp/getinf.php",
      method: 'get',
      success: function (res) {
        //console.log(res.data);
        that.jiexi(res.data);
      }
    })
  },


  // 下面是一个查看图片函数，可以点击图片进行放大操作。
  chakanimg: function (res) {
    var curr = res.currentTarget.dataset.imgurl
    wx.previewImage({
      urls: this.data.imglist,
      current: curr
    })
  },

 //下面这个函数就是当你往下滑到底最底面。会自动再次请求服务器获取数据 
  xialashuaxin: function () {
    this.setData({ isHideLoadMore: false });
    var that = this;
    wx.request({
      url: 'https://www.gamewan.top/tp/getinf.php',
      method: 'POST',
      data: 'from=' + this.data.count,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        //console.log(res.data);
        var count = that.data.count + 10;
        //console.log(count);
        that.setData({ count: count });
        //下面是一个防止恶意刷新而设置的延时函数。
        setTimeout(function () { that.jiexi2(res.data) }, 2000);
      }
    })
  },


  //下面是一个解析函数，加载后把加载到的数据传给这个函数。
  //然后进行数据绑定，实现wxml文件中能直接引用
  jiexi: function (res) {
    var imglist = [];
    //下面是为了解决苹果和安卓解析方式不一样而设置的一个转化机制。
    if (typeof res == 'string')
      res = JSON.parse(res.trim());
    var temp = [];
    //console.log(typeof res);
    for (var idx in res) {
      var item = res[idx];
      //console.log(item);
      //如果这个二手商品是自己发布的话，那么这个是可以自己删除的。
      //下面就是定义了这么一个属性
      if (this.data.openid == item.openid)
        item.isdelete = 'delete-yes';
      else
        item.isdelete = 'delete-no';
      //console.log("item信息:"+item.pic1);
      //下面就是初始化图片的信息。主要就是宽度是满屏，高度按长宽比来算高度
      item.pic1height = 690 * parseInt(item.pic1height) / parseInt(item.pic1width);
      item.pic1width = 690;
      //下面是几个解密函数
      item.name = unescape(item.name);
      item.content = unescape(item.content);
      item.title = unescape(item.title);
      //把刚才解析出来的放到那个temp数组里面
      imglist.push(item.pic1);
      temp.push(item);
    }
    //下面就是数据绑定上。。
    this.setData({ inf: temp });
    this.setData({ imglist: imglist });
    this.setData({ isHideLoadMore: true });
    //console.log(temp);
  },



  //下面这个函数和上面的函数几乎一样就是
  jiexi2: function (res) {
    if (typeof res == 'string')
      res = JSON.parse(res.trim());
    var temp = this.data.inf;
    for (var idx in res) {
      var item = res[idx];
      //console.log(item.openid + this.data.openid);
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
    this.setData({ inf: temp });
    this.setData({ isHideLoadMore: false });
  },



  
  makecall: function (event) {
    // var that = this;
    console.log(event)
    var postId = event.currentTarget.dataset.postid;
    wx.makePhoneCall({
      phoneNumber: "" ,//+ that.data.title,
      complete: function (res) {
        //console.log(postId);
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