Page({
  data: {
    searchPanelShow: false,
    key: '',
  },




  //当页面加载时会默认访问一次服务器，并加载一些数据。
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://www.gamewan.top/jyxx/getinf.php',
      method: 'get',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data);
        that.jiexi(res.data);
      }
    })
  },

  //这是个页面显示时会调用的函数，但是必须是先隐藏后然后在显示才会调用，直接naviga并不会调用


  onShow: function (options) {

  },



  //////////下面是搜索框的函数。
  onBindchange: function (event) {
    //下面这个是把输入的东西赋值给text！！
    var text = event.detail.value;
    //下面的if语句如果输入内容就会搜索，否则跳到else上！！！
    if (text.length != 0) {
      //下面这个是先清空加载出来的数据；
      this.setData({ inf: '' })
      // 现在是在函数中，为了能够正常调用解析函数。所以要进行这个操作。
      var that = this;
      wx.request({
        url: 'https://www.gamewan.top/jyxx/searchnews.php',
        method: 'post',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: 'key=' + text,
        success: function (res) {
          that.jiexi(res.data);
        }
      })
    }
    else {
      wx.showToast({
        title: '没输入搜啥啊！',
      })
    }
  },



//下面两条是关于搜索的 
  //下面是点击搜索时右边出现的小x号，点击即可恢复原来的状态
  onCancelImgTap: function (event) {
    this.setData({
      searchPanelShow: false,
      searchResult: { }
    })
    this.setData({ key: '' });
  },
  //下面的函数就是点击搜索会产生的效果，如果为true  则会出现那个x号
  onBindFocus: function (event) {
    this.setData({
      searchPanelShow: true,
    })
  },






  //下面是点击某篇文章会跳转到某个页面的函数，，传过去的是本篇文章的id
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    console.log(event)
    wx.navigateTo({
      url: "detail/detail?id=" + postId
    })
  },


  //把解析这个函数提取出一个函数，使以后不管是加载或者收缩时都能使用。
  jiexi: function (data) {
    if (typeof data == 'string')
      data = JSON.parse(data.trim());
    this.setData({ inf: data });
  },



  //下面定义一个可以分享的函数
  onShareAppMessage: function () {
    return {
      title: '人生很苦，记得每天清晨给自己的豆浆里加点糖',
    };
  },

  //下面这个按钮跳转到发布页面
  onTap: function () {
    wx.navigateTo({
      url: "post/post"
    })
  }

});