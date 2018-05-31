Page({
  data: {
    isfabu: false,
    username: '',
    touxiang: '',
    ischeck:false,
    pas:'',
    max:'0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({ openid: '' });
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
  onShareAppMessage: function () {
  },
  onShow:function(options){
    console.log("11111");
  } ,
  
  
  //下面是图片的函数
  choose: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: "compressed",
      success: function (res) {
        that.setData({ images: res.tempFilePaths });
        that.setData({ size: res.tempFiles[0].size });
        console.log(res.tempFiles[0].size);
        var that1 = that;
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res) {
            that1.setData({ width: res.width });
            that1.setData({ height: res.height });
          }
        })
      },
    })

  },



  //下面是删除函数
  delimg: function (res) {
    var id = res.currentTarget.dataset.id;
    console.log(id);
    var temp = [];
    var images = this.data.images;
    for (var idx in images) {
      if (id != idx)
        temp.push(images[idx]);
    }
    this.setData({ images: temp });
    wx.showToast({
      title: '删除成功',
    })
  },


  //下面是发布函数。
  fabu: function () {
    if (this.data.isfabu === false) {
      var images = this.data.images;
      var title = this.data.title;
      var content1 = this.data.content;
      var didian = this.data.didian;
      var fuli = this.data.fuli;
      var renshu = this.data.renshu;
      var name = this.data.username;
      var author = this.data.author;
      var content = content1 + "1111" + didian + "1111" + renshu + "1111" + fuli;
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
      this.setData({ isfabu: true })
      var flag = this.randomString(10);
      this.setData({ flag: flag });
      var that = this;
      for (var idx in images) {
        wx.uploadFile({
          url: 'https://www.gamewan.top/jyxx/add.php',
          filePath: images[idx],
          header: { "content-type": "multipart/form-data" },
          name: "file",
          formData: {
            'title': title,
            'content': content,
            'author': author,
          },
          success: function (res) {
            console.log(res.data);
            if (res.data.trim() == "Successfully!") {
              wx.showToast({
                title: '发表成功',
              })
              wx.navigateBack({
              })
            }
            else {
              wx.showToast({
                title: '发表失败',
              })

            }

          },
          complete: function () {
            that.setData({ isfabu: false })
          }
        })
      }
    }
  },
  randomString: function (len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return pwd;
  },


  gettitle: function (res) {
    this.setData({ title: res.detail.value });
  },
  getxiangqing: function (res) {
    this.setData({ content: res.detail.value });
  },
  getauthor: function (res) {
    this.setData({ author: res.detail.value });

  },
  getdidian: function (res) {
    this.setData({
      didian: res.detail.value
    })
  },
  getrenshu: function (res) {
    this.setData({
      renshu: res.detail.value
    })
  },
  getfuli: function (res) {
    this.setData({
      fuli: res.detail.value
    })
  },


  yzm: function (res) {
    this.setData({ pas: res.detail.value });
  },

  tijiao:function(){
    var pas=this.data.pas
    if (pas != 'xuxin666')
      wx.showModal({
        title: '提示',
        content: '对不起，密码错误，不可发布',
      })
    else
      this.setData({ ischeck: true })
  }
})