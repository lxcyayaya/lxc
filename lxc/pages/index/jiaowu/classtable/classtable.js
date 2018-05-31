// pages/classtable/classtable.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  
    color: ['hxview_ls', 'hxview_qs', 'hxview_sl', 'hxview_qz', 'hxview_z', 'hxview_sf', 'hxview_rf', 'hxview_h', 'hxview_hd', 'hxview_h1', 'hxview_h2'],
    openid:'',
    isHideLoadMore:false,
    maxweek:0,
    dqz:0,
    week:[],
    yzmbox:true,
    autoyzmswitch:false//是否自动验证码开关
    
  
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var that=this;
   
    if (that.data.openid == '') {
      var openid = options.openid;
      that.setData({ openid: openid });
    }
    else
      var openid = that.data.openid;
   
    wx.getStorage({
      key: 'classtable',
      success: function(res) {
        console.log(res.data)
      
        if (res.data) { 
          that.setData({ isHideLoadMore: true });
          that.setclasstable(res.data);
          //that.setData({ classtable:res.data })
          //that.lightordie();
          }
          
       
       
      },
      fail:function(){
        console.log(openid);
        that.denglu(openid);
       

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
  lightordie:function(){
    var maxweek,weektemp=0;
    var classtable=this.data.classtable;
    var light=[];
    var res;
    var tmp = Date.parse(new Date()).toString();
    var kksj = 1520179200;//开课时间的时间戳(10位)
    tmp = tmp.substr(0, 10);
    var day = (tmp - kksj) / 86400;
    day = parseInt(day)+1;
    var week, dsz = 0;
    if (day > 1) {
      week = (day - 1) / 7 + 1;
      week = parseInt(week);
    }
    else
      week = 1;

    this.setData({dqz:week});  
    for(var idx in classtable)
    {
      var item=classtable[idx];
      var temp;
      if(item.time=='')
        temp ='hxview_kk';
      else{
       
        
        
        
    
        var dz = new RegExp('单周','')
        var sz=new RegExp('双周','')
        var qingkuangsi = item.time.split(",");

      
        var ttt=item.time;
      
        if (ttt.match(dz)){
          dsz=1;
         
          res = item.time.substring(0, item.time.length - 2);
       
        }
       
        else if (ttt.match(sz)) {
          
          dsz = 2;
          res = item.time.substring(0, item.time.length - 2);
         
        }
        else if (qingkuangsi.length > 1) {//如果是1-14,15-18形式的
 
          for (var j in qingkuangsi) {
            var tmprs = qingkuangsi[j].split("-");
            var tmpstart = tmprs[0]
            var tmpend = tmprs[1]
            if (week <= tmpend) {
              res = qingkuangsi[j]
              break;
            }
          }
          if (res == undefined)
            res = qingkuangsi[1]


        }
        else {
          dsz = 0;
          res = item.time.substring(0, item.time.length - 1);
        }
       //    
          

        
        var rs = res.split("-");
       
      
        var start = rs[0];
        var end =rs[1];
       
        maxweek=parseInt(end);
        if(maxweek>=weektemp)
        {
          weektemp=maxweek;
        }
        
      
       
         
       
     
        
        var index = parseInt(Math.random() * (11));
        console.log("随机数是"+index);
       
      
        if (week >= start && week <= end)
          temp = this.data.color[index]
        else
          temp ="hxview_hs"

        if (dsz == 1 && week % 2 == 0)
          temp = "hxview_hs";
        if (dsz == 2 && week % 2 == 1)
          temp = "hxview_hs";
          




      



      }






      light.push(temp);


      
      
    }
    console.log(weektemp);
    this.setData({ weektemp: maxweek });
    var countweek = [];
    var classdqz=[]
  
    for (var i = 1; i <= weektemp; i++) {
      countweek.push(i);
      if(week==i)
        classdqz.push('dqz');
        else
        classdqz.push('notdqz');

    }
    console.log(classdqz);
    this.setData({classdqz:classdqz});
   
    this.setData({ week: countweek });
    this.setData({light:light});
    console.log(this.data.maxweek);
   


  },
  denglu:function(res){
    var openid=res;
    var that = this;

    wx.request({
      url: 'https://www.gamewan.top/jiaowu/openid/getinfo.php',
      method: 'POST',
      header: { 'Content-Type': ' application/x-www-form-urlencoded' },
      data: 'openid=' + openid,
      success: function (res) {
        if (typeof res.data == 'object') {

          if (res.data == null) {
            wx.showModal({
              title: '提示',
              content: '暂未绑定，重洗进入程序来绑定',
              success: function (res) {
                wx.reLaunch({
                  url: '/pages/index/index',
                })

              }
            })
          


          }


        }
        else {



          if (res.data == 'null') {
            

            wx.showModal({
              title: '提示',
              content: '暂未绑定，重洗进入程序来绑定',
              success: function (res) {
                wx.reLaunch({
                  url: '/pages/index/index',
                })

              }
            })
          


          }

        }
        console.log(res);
       

        var data = res.data;
        if (typeof data == 'string')
          data = JSON.parse(data.trim());
        console.log(typeof data);
        console.log(data);
        that.setData({ username: data.username })
        that.setData({ password: data.password })
        // that.yzmbind();
        that.getyzm();




  }
  })},
  getyzm: function () {
    var that = this;
   if(this.data.autoyzmswitch){//自动获取验证码的代码块
     wx.request({
       url: 'https://www.gamewan.top/jiaowu/getimg.php?username=' + this.data.username,
       method: 'GET',
       success: function (res) {
         console.log(res);

         that.setData({ captcha: res.data });

         //that.setData({ yzmtp: res.data });

         if (res.data != '')
           that.loginbind();
         if (res.data == '')
           that.getyzm();
       }

     })


   }
   else{//手动填写验证码的代码块
     this.setData({ yzm:''})//清空验证码输入框
     wx.request({
       url: 'https://www.gamewan.top/jiaowu/getimg1.php?username=' + this.data.username,
       method: 'GET',
       success: function (res) {
         console.log(res);
         that.setData({ yzmtp: res.data });
         that.setData({ yzmbox:false})

         
       }

     })

   }
   
  },
  loginbind: function () {
    var that = this;
    this.setData({ yzmbox:true})//隐藏验证码输入框防止用户多次点击

   

    wx.request({
      url: 'https://www.gamewan.top/jiaowu/login.php',
      method: 'POST',
      header: { 'Content-Type': ' application/x-www-form-urlencoded' },
      data: 'yzm=' + this.data.captcha + '&username=' + this.data.username + '&password=' + this.data.password,
      success: function (res) {
        console.log('yzm=' + that.data.captcha + '&username=' + that.data.username + '&password=' + that.data.password);
        that.jiexi(res.data);
      }
    })
   
   

  },
  jiexi: function (data) {
    console.log(data);
    console.log(typeof data);
    if (typeof data == 'string') {
      data = data.trim();

      if (data == 'true') {
       
        this.getclass();


      }
      else {
        
        this.onLoad();
        return;
      }




    }
    else {
      {
        if (data == true) {
          
          this.getclass();



        }
        else {
        
          this.onLoad();
          return;
        }

      }
    }
  },
  getclass: function () {
    var that = this;
    
    wx.request({
      url: 'https://www.gamewan.top/jiaowu/getclass.php',
      method: 'post',
      header: { 'Content-Type': ' application/x-www-form-urlencoded' },
      data: 'username=' + this.data.username,
      success: function (res) {
        console.log(res.data);
        that.jiexikebiao(res.data);
        

      }
    })
    
   

  },
  jiexikebiao:function(res){
    this.setData({ isHideLoadMore: true });
    if (typeof res == 'string')
      res = JSON.parse(res.trim());
     console.log(res); 
  wx.setStorage({
    key: 'classtable',
    data: res,
  })
var that=this;
wx.getStorage({
  key: 'classtable',
  success: function(res) {
    if (res.data) {
      that.setclasstable(res.data);

     
    }


  },
})


  },
  setclasstable:function(classtable){
    var tmp=[];
    var dqz=this.getdqz();
   

    for(var idx in classtable){
      var item =classtable[idx];
     if(item.name2!=undefined){
       var res;
       var dsz=0;
       var dz = new RegExp('单周', '')
       var sz = new RegExp('双周', '')
       var ttt = item.time;
       var qingkuangsi = item.time.split(",");

       if (ttt.match(dz)) {
         dsz = 1;

         res = item.time.substring(0, item.time.length - 2);

       }

       else if (ttt.match(sz)) {

         dsz = 2;
         res = item.time.substring(0, item.time.length - 2);

       }
       else if (qingkuangsi.length > 1) {//如果是1-14,15-18形式的

         for (var j in qingkuangsi) {
           var tmprs = qingkuangsi[j].split("-");
           var tmpstart = tmprs[0]
           var tmpend = tmprs[1]
           if ( week <= tmpend) {
             res = qingkuangsi[j]
             break;
           }
         }
         if(res==undefined)
           res = qingkuangsi[1]
         
         }
       else {

         dsz = 0;
         res = item.time.substring(0, item.time.length - 1);

       }


       var rs = res.split("-");
       var start = rs[0];
       var end = rs[1];
       console.log(end);
       if(dqz>end){
         item.name=item.name2;
         item.place=item.place2;
         item.time=item.time2;
       } 
     }
     tmp.push(item);
     

     


    }


    this.setData({ classtable: tmp });
    //that.setData({ classtable: res.data })
    this.lightordie();


  },
  getdqz:function(){
    var tmp = Date.parse(new Date()).toString();
    var kksj = 1503849600;
    tmp = tmp.substr(0, 10);
    var day = (tmp - kksj) / 86400;
    day = parseInt(day) + 1;
    var week, dsz = 0;
    if (day > 1) {
      week = (day - 1) / 7 + 1;
      week = parseInt(week);
    }
    else
      week = 1;

    return week;  


  },
  lightordie1:function(week){
    var classtable = this.data.classtable;
    week = parseInt(week);
    var light = [];
    var res;
    var dsz=0;
    var classdqz=this.data.classdqz;
    for(var idx in classdqz)
    {classdqz[idx]='notdqz';
      var t =parseInt(idx)+1;
    console.log(t);
    if(week==t)
      classdqz[idx] = 'dqz';
      else
      classdqz[idx] = 'notdqz';
    }
    console.log(classdqz);
   this.setData({classdqz:classdqz});

    this.setData({ dqz: week });
    for (var idx in classtable) {
      var item = classtable[idx];
      var temp;
      if (item.time == '')
        temp = 'hxview_kk';
      else {
        var dz = new RegExp('单周', '')
        var sz = new RegExp('双周', '')
        var qingkuangsi = item.time.split(",");


        var ttt = item.time;

        if (ttt.match(dz)) {
          dsz = 1;

          res = item.time.substring(0, item.time.length - 2);

        }

        else if (ttt.match(sz)) {

          dsz = 2;
          res = item.time.substring(0, item.time.length - 2);

        }
        else if (qingkuangsi.length > 1) {//如果是1-14,15-18形式的

          for (var j in qingkuangsi) {
            var tmprs = qingkuangsi[j].split("-");
            var tmpstart = tmprs[0]
            var tmpend = tmprs[1]
            if (week <= tmpend) {
              res = qingkuangsi[j]
              break;
            }
          }
         if(res==undefined)
           res = qingkuangsi[1]


        }
        else {
          dsz = 0;
          res = item.time.substring(0, item.time.length - 1);
        }




        var rs = res.split("-");


        var start = rs[0];
        var end = rs[1];

        var index = parseInt(Math.random() * (11));
        console.log("随机数是" + index);


        if (week >= start && week <= end)
          temp = this.data.color[index]
        else
          temp = "hxview_hs"

        if (dsz == 1 && week % 2 == 0)
          temp = "hxview_hs";
        if (dsz == 2 && week % 2 == 1)
          temp = "hxview_hs";









      }






      light.push(temp);




    }
    this.setData({ light: light })
    console.log(this.data.maxweek);




  },
  qiehuan:function(res){
   var week=res.currentTarget.dataset.week+1;
   this.lightordie1(week);
  },
  qckb:function(){
    var that =this;
    wx.removeStorage({
      key: 'classtable',
      success: function(res) {
        console.log(res);
        if (res.errMsg =='removeStorage:ok')
        that.setData({classtable:''});
        that.setData({light:''});
        


      },
    })
  },
  yzm:function(res){
    var captcha = res.detail.value;
    this.setData({ captcha: captcha })
  }
  
})