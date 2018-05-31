Page({
  data: {isfabu:false,
    content:'',
    username:'',
    touxiang:'',
    max:'0'
  },

  onLoad: function (options) {
    var that=this; 
   
    this.setData({ openid: options.openid });
 
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

    
  },

  onReady: function () {
    
  },

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
  choose:function(){
    var that=this;
wx.chooseImage({
  count:1,
  sizeType: "compressed",
  success: function(res) {
    that.setData({images:res.tempFilePaths});
    console.log(res.tempFilePaths)
    var that1=that;
    wx.getImageInfo({
      src: res.tempFilePaths[0],
      success:function(res){
        that1.setData({width:res.width});
        that1.setData({height:res.height});
      }
    })
    console.log(that.data.images); 
  },
})

  },
  delimg:function(res){
    var id = res.currentTarget.dataset.id;
    console.log(id);
    var temp=[];
    var images=this.data.images;
    for(var idx in images){
      if(id!=idx)
      temp.push(images[idx]);
    }
    this.setData({images:temp});
    wx.showToast({
      title: '删除成功',
    })
  },
  fabu:function(){
    if(this.data.isfabu===false){
    
    var images=this.data.images;
    //下面这个是一个手机号
    var title = this.data.title;
    //下面这个是一个标题
    var title1 = this.data.title1;
    title=title+title1;

    title=escape(title);

    var content = this.data.content;

    var touxiang = this.data.touxiang;

    var name = this.data.username;
    name=escape(name);
    var price=this.data.price;
    console.log(price);
    if (title.length < 3) {
      wx.showToast({
        title: '题目字数太少',
      });
      return;
    }
    if (content.length < 5) {
      wx.showToast({
        title: '描述字数太少',
      });
      return;
    }
    if (price < 1) {
      wx.showToast({
        title: '价格不能不写啊',
      });
      return;
    }
    if (this.data.openid==undefined){
      wx.showModal({
        title: '提示',
        content: '您没有绑定学号，不允许使用二手市场',
      })
      return;
    }
    if (this.data.openid == 'undefined') {
      wx.showModal({
        title: '提示',
        content: '您没有绑定学号，不允许使用二手市场',
      })
      return;
    }

    this.setData({ isfabu: true })
    var flag = this.randomString(10);
    this.setData({flag:flag});
    var that=this;
  for(var idx in images){
      wx.uploadFile({
        url: 'https://www.gamewan.top/tp/uploadimg.php',
        filePath: images[idx],
        header: { "content-type": "multipart/form-data" },
        name: "file",
        formData: { 'openid': that.data.openid, 
        'flag': flag ,
        'title':title,
        'content':content,
        'touxiang':touxiang,
        'price': price,
        'name':name,
        'pic1width':this.data.width,
        'pic1height':this.data.height
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.trim() == "Successfully!")
            {wx.showToast({
              title: '发表成功',
            })
            wx.navigateBack({
              
            })
            }
            else{
            wx.showToast({
              title: '发表失败',
            })

            }

        },complete:function(){
          that.setData({isfabu:false})
        }
      })
  }}
  },
  randomString: function (len) {
    　　len = len || 32;
    　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    　　var maxPos = $chars.length;
    　　var pwd = '';
    　　for(var i = 0; i <len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
},


//这其实是一个手机号
  getbiaoti:function(res){
    this.setData({ title: res.detail.value});
  },
  getxiangqing: function (res) {
    this.setData({ content: res.detail.value });
  },
  getjiage:function(res){
    this.setData({ price: res.detail.value }); 
  },
  //下面这个是真正的标题。
  getbiaoti1:function(res){
    this.setData({ title1: res.detail.value }); 
  }
})