// pages/index/zxdt/zxdt.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
   isdisplay:true,
   fenshu:0,
   model:'学习模式'
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid=options.openid
    this.setData({openid:openid})
    var that=this
  
    wx.request({
      url: 'https://www.gamewan.top/zxdt/getinf.php',
      method: 'post',
      data: 'openid=' + openid,
      header: { 'Content-Type': ' application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res)
        var data =res.data
        if(typeof data=='string'){
          data=JSON.parse(data.trim())
              }
              that.displayquestion(data);

    



      }})

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
  displayquestion:function(data){

  
    for(var temp in data){
      if(data[temp]==null)
      continue;
      if(data[temp].answera==null)
        data[temp].istexta=true
        else
        data[temp].istexta = false
      if (data[temp].answerb == null)
        data[temp].istextb = true
      else
        data[temp].istextb = false
      if (data[temp].answerc == null)
        data[temp].istextc = true
      else
        data[temp].istextc = false
      if (data[temp].answerd == null)
        data[temp].istextd = true
      else
        data[temp].istextd = false
      if (data[temp].answeraimage == null)
        data[temp].isimagea = true
      else
        data[temp].isimagea = false
      if (data[temp].answerbimage == null)
        data[temp].isimageb = true
      else
        data[temp].isimageb = false
      if (data[temp].answercimage == null)
        data[temp].isimagec = true
      else
        data[temp].isimagec = false
      if (data[temp].answerdimage == null)
        data[temp].isimaged = true
      else
        data[temp].isimaged = false

      if (data[temp].titleimage==null)
        data[temp].isimagetitle = true
      else
        data[temp].isimagetitle = false


      if (data[temp].answerd == null && data[temp].answerdimage==null)
      data[temp].nod=true



    }
    console.log(data)
    this.setData({list:data})


  },
  tijiao:function(){
    this.setData({isdisplay:false})
    wx.showModal({
      title: '您的分数',
      content: this.data.fenshu+'分',
      showCancel: true,
      confirmText: '确定',
      cancelText: '取消',
      cancelColor: '',
    
      confirmColor: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })



  },
  myanswer:function(e){
    var myanswer=e.detail.value
    var answer = e.currentTarget.dataset.answer
    if(myanswer==answer)
    {var fenshu=this.data.fenshu
    fenshu=fenshu+10
      this.setData({fenshu:fenshu})

    }



  },
  setmodel:function(){
    if(this.data.model=='学习模式'){
    this.setData({ isdisplay: false })
    this.setData({ model: '测试模式' })}
    else
    {
      this.setData({ isdisplay: true })
      this.setData({ model: '学习模式' })
      
    }


  }
})