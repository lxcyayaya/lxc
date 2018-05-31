var app = getApp();
Page({
    data: {
        nameid_focus:false,
        passid_focus:false,
        angle: 0
    },
  
    bind: function () {
     wx.navigateTo({
       url: 'result/result',
     })

    },
    nameidInput: function (e) {
        this.setData({
            nameid: e.detail.value
        });
        
    },
    passidInput: function (e) {
        this.setData({
            passid: e.detail.value
        });
    },
  
    inputFocus: function (e) {
        if (e.target.id == 'nameid') {
            this.setData({
                'nameid_focus': true
            });
        }
        if (e.target.id == 'passid') {
            this.setData({
                'passid_focus': true
            });
        }
       

    },
    inputBlur: function (e) {
        if (e.target.id == 'nameid') {
            this.setData({
                'nameid_focus': false
            });
        } else if (e.target.id == 'passid') {
            this.setData({
                'passid_focus': false
            });
        }
    },

});