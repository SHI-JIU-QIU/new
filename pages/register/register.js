var app = getApp();

Page({
  data: {
    username: '',
    password: '',
    result: '',
  },

  //注册
  dian: function (e) {
    var that = this;
    this.setData({
      username: e.detail.value.name,
      password: e.detail.value.password,
    })

    console.log(this.data.username);
    wx.request({

      url: 'http://localhost:8080/news/register',
      //  url: 'http://10.63.165.212:8080/mini/register',
      data: {
        name: that.data.username,
        password: that.data.password
      },

      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          result: 'success'
        })
        wx.redirectTo({
          url: "../login/login"
        })

      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })

  },

})