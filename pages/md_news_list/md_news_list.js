// pages/md_news_list/md_news_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newList: [],
  },

  onLoad: function (options) {
    console.log('hhh')
    this.list()
  },


  //获取新闻列表
  list: function () {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8080/news/list', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        that.setData({
          newList: res.data
        })
      }
    })
  },



  //跳转到修改页面
  toEditNew(e) {
    const id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: `../md_news/md_news?id=${id}`,
    })

  },

  onShow: function () {
    this.getTabBar().setData({
      active: 2
    })
    this.list();
  },
})