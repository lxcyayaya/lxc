// pages/index/MOS/wechat/wechat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {name:'',
  username:'',
phone:'',
km:'',
isbaoming:'确认报名',
jibie:'',
alipay:'',
check1:true,
check2: true,
check3: true,
check4: true ,
jibie:'签约'
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ openid: options.openid });
    this.getinf(options.openid);
  
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

  name:function(e){
   
    this.setData({ name: e.detail.value});
  },
  username: function (e) {

    this.setData({ username: e.detail.value });
  },
  phone: function (e) {

    this.setData({ phone: e.detail.value });
  },
  alipay: function (e) {

    this.setData({ alipay: e.detail.value });
  },
  checkbox:function(e){
    console.log(e);
    var km='';
    for(var idx in e.detail.value)
    {
      km = km + e.detail.value[idx];

    }
    this.setData({km:km});
    console.log(km);
  },
  baoming:function(){
    if(this.data.name.length<=1){
      wx.showToast({
        title: '请填写姓名',
      })
      return;
    }
    if(this.data.username.length<10){
      wx.showToast({
        title: '请填写合法学号',
      })
      return;
    }
    if (this.data.phone.length < 11) {
      wx.showToast({
        title: '请填写合法手机',
      })
      return;
    }
    if (this.data.alipay.length < 1) {
      wx.showToast({
        title: '请填写支付宝实名姓名',
      })
      return;
    }
    
    /*
    if (this.data.km.length < 1) {
      wx.showToast({
        title: '请选择科目',
      })
      return;
    }*/
    if (this.data.jibie.length < 1) {
      wx.showToast({
        title: '请选择类型',
      })
      return;
    }
    var openid =this.data.openid;
    wx.request({
      url: 'https://www.gamewan.top/mos/add.php',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: "username="+this.data.username+"&name="+this.data.name+"&phone="+this.data.phone+"&openid="+this.data.openid+"&alipay="+this.data.alipay+"&jibie="+this.data.jibie,
      success: function (res) {
        var data=res.data;
        console.log(res);
        if(typeof data=='string'){
          data=data.trim();
        }
        if(data=='1'){
          wx.showModal({
            title: '提示',
            content: '报名成功，返回交钱，微信付款时须在留言处填写本人学号',
            success: function (res) {
          
              wx.redirectTo({
                url: '../MOS?openid=' + openid,
              })
             }
          })

        }
        else{
          wx.showModal({
            title: '提示',
            content: '报名失败',

          })
        }

      }})
  },
  getinf:function(openid){
    var that=this;
    wx.request({
      url: 'https://www.gamewan.top/mos/search.php',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method:"post",
      data:"openid="+openid,
      success:function(res){
        var data=res.data;
        if(typeof data=='string')
        {
         data = JSON.parse(data.trim());}
         if(data!==null){
           that.jiexi(data);
         }
        
        
      }


    })

  },
  jiexi:function(res){
    console.log(res);
    this.setData({username:res.username});
    this.setData({ name: res.name });
    this.setData({ phone: res.phone });
    if(res.ispay=='0'){
      this.setData({ isbaoming: '已经报名:待确认' });
    }
    if (res.ispay == '1') {
      this.setData({ isbaoming: '已经报名:已缴费' });
    }
    if (res.leixing =='视频普通'){
    this.setData({check1:true})
    this.setData({ check2: false })
    this.setData({ check3: false })
    this.setData({ check4: false })
    }
    if (res.leixing == '视频循环')
    {
      this.setData({ check1: false })
      this.setData({ check2: true })
      this.setData({ check3: false })
      this.setData({ check4: false })}
    if (res.leixing == '面授')
    {
      this.setData({ check1: false })
      this.setData({ check2: false })
      this.setData({ check3: true })
      this.setData({ check4: false })
    }
    if (res.leixing == '签约')
    {
      this.setData({ check1: false })
      this.setData({ check2: false })
      this.setData({ check3: false })
      this.setData({ check4: true })
    }
  
    if (res.alipay !='')
    this.setData({alipay:res.alipay});
    this.setData({ btn:' pointer-events: none;'})



  },
  zhuanyeorzhuanjia:function(e){
    console.log(e.detail);
    this.setData({jibie:e.detail.value});
  }

})