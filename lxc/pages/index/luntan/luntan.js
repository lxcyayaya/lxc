// pages/image-for-hrb/jianzhi/jianzhi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
 
 
    touxiang:'',
    id:'',
  

  },
  
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    //var title='';
   
    this.setData({title:'第一次'});
    var that = this;
    wx.request({
      url: 'http://47.95.224.243/ligongyun/getinf.php',
      method:'GET',
    //  header: { 'content-type':'application/json'},
      success:function(res){
        that.savedata(res.data); 
      
      }
    });
    wx.getUserInfo({
      success: function (res) {
      
        that.savetouxiang(res.userInfo.avatarUrl);
       


      },
      fail: function () {
        console.log("获取失败");
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
  savedata:function(str){
    /*安卓开始

  //this.setData({ dataaaa:temp   })
    console.log(typeof str);
    

    var datap=JSON.parse(str.trim());
   // var datap=JSON.parse(str);
    
    console.log(typeof datap);
    this.setData({datap:datap});
 安卓结束*/
 this.setData({datap:str});
  

  



  


  },
  savetouxiang:function(urltouxiang){
    this.setData({
      touxiang: urltouxiang
    });

  },
  viewontap:function(event){
    var id=event.currentTarget.dataset.id;
   
    wx.navigateTo({
      url: 'xiangqing/xiangqing?id='+id
    })
  }
})