// pages/user/user.js

var app = getApp();
Page({

  data: {
    username: ''
  },
  onLoad: function (options) {
    if (options.hasOwnProperty('username')) {
      this.setData({
        username: options.username
      })
    }
    if (this.data.username == '') {
      wx.redirectTo({
        url: '../login/login',
      })
    }
    console.log(options);

  },

  onShow: function () {
    this.getTabBar().setData({
      active: 4
    })


  },

})