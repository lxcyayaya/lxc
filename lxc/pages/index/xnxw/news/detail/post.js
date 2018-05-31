Page({
  data: {   
  },
//下面是页面加载函数，，
  onLoad: function (options) {
    var id = options.id;
    var that=this;
    this.setData({id:id});
    wx.request({
      url: 'https://www.gamewan.top/news/search.php',
      method:'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:'id='+id,
      success:function(res){
        that.jiexi(res.data);
      }
    })   
  },



  onShow: function () {
  },



  onShareAppMessage: function () {
  },


//解析函数，数据绑定
  jiexi:function(data){
    console.log(data);
    this.setData({data:data});
  }
})