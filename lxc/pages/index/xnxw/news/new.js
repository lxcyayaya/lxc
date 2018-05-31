Page({


  data: {
    searchPanelShow: false,
    key:''
  },


  onBindchange: function (event) {
    var text = event.detail.value;
    if(text.length!=0){
    this.setData({inf:''})
    var that=this;
    wx.request({
      url: 'https://www.gamewan.top/news/searchnews.php',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:'key='+text,
      success: function (res) {
        that.jiexi(res.data);
      }
    })}
  },


  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {}
    })
    this.setData({key:''});
  },


  onBindFocus: function (event) { 
    this.setData({
      containerShow: false,
      searchPanelShow: true,
    })
  },
  

  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "detail/post?id=" + postId
    })
  },


  onLoad:function(){
    var that=this;
    wx.request({
      url: 'https://www.gamewan.top/news/getinf.php',
      method:'get',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success:function(res){
        console.log(res.data)
        that.jiexi(res.data);
      }
    })
  },


  jiexi:function(data){
    console.log(data);
    if (typeof data == 'string')
      data = JSON.parse(data.trim());
    this.setData({inf:data});
  }


});