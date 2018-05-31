Page({
  data: {
  },
  onLoad: function (options) {
    //下面的that为request进行数据绑定。
    var that = this;
    var id = options.id;
    this.setData({ id: id });
    wx.request({
      url: 'https://www.gamewan.top/jyxx/search.php',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: 'id=' + id,
      success: function (res) {
        // console.log(res.data);
        that.jiexi(res.data);
      }
    })
  },


  //下面是一个分享函数。。

  onShareAppMessage: function () {
  },


  //解析函数，负责把加载来的数据绑定上：
  jiexi: function (data) {
    this.setData({ data: data });
    var aa = data.content;
    var strs = aa.split("1111");
    this.setData({
      content: strs[0],
      didian: strs[1],
      renshu: strs[2],
      fuli: strs[3],
    });
  }
})