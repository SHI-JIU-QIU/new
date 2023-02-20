// pages/detail_new/detail_new.js
Page({
  data: {
    id: '',
    title: '',
    content: '',
    img: '',
    cTime: ''
  },

  onLoad(options) {
    console.log(options);

    this.setData({
      id: options.id,
    })
    this.detail()
  },

  //根据id获取新闻详情
  detail: function () {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8080/news/detail', //仅为示例，并非真实的接口地址
      data: {
        id: that.data.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          title: res.data[0].title,
          content: res.data[0].content,
          cTime: res.data[0].cTime,
          img: res.data[0].img
        })
      }
    })
  },
})