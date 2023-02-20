var app = getApp();

Page({
  data: {
    username: '',
    password: '',
    result: '',
  },
  //登陆
  dian: function (e) {
    var that = this;
    this.setData({
      username: e.detail.value.name,
      password: e.detail.value.password,
    })
    wx.request({
      url: 'http://localhost:8080/news/login',
      data: {
        name: that.data.username,
        password: that.data.password,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          result: 'success'
        })
        wx.reLaunch({
          url: `../user/user?username=${that.data.username}`,
        })
      },
      fail: function (res) {
        that.setData({
          result: 'fail'
        })
        console.log(".....fail.....");
      }
    })

  },
  //跳转注册
  toRegister() {
    wx.navigateTo({
      url: '../register/register',
    })
  }

})