// pages/index/guojia/siliuji/slj/result/result.js 

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var util = require('../../../../..//utils/md5.js');  
    var idcard=options.idcard;
    var name = options.name;
    var that =this;
    wx.request({
      url: 'https://www.gamewan.top/guojia/search.php',
      method:'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:"idcard="+util.hexMD5(idcard+'xuxin666')+"&name="+name,
      success:function(res){
        that.jiexi(res.data);

        console.log(res);
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
  backhome:function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })


  },
  jiexi:function(res){
    console.log("dasdsadasd"+res);
    
    var cj=res;

    if (typeof cj == 'string')
      cj = JSON.parse(cj.trim());
    if(cj.length==0)
    wx.showModal({
      title: '提示',
      content: '您的输入有误或者没有您的成绩',
      success:function(res){
        console.log(res);
        wx.navigateBack({
          
        });

      }
    });
    for(var idx in cj){
    
      if (cj[idx].zkzh.substring(0,2)=='24'){
        cj[idx].km='C语言';
      }
      if (cj[idx].zkzh.substring(0, 2) == '27') {
        cj[idx].km = 'VFP';
      }
      if (cj[idx].zkzh.substring(0, 2) == '65') {
        cj[idx].km = '高级OFFICE';
      }
      
    


    }

    this.setData({inf:cj});
    
    



  }
})