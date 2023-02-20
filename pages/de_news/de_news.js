// pages/de_news/de_news.js
Page({

  data: {
    newList: [],

  },

  /** * 生命周期函数--监听页面加载*** */
  onLoad: function (options) {
    console.log('hhh')
    this.list()
  },

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
  //根据id删除新闻
  deleteNew(e) {
    var that = this
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定删除这篇新闻吗？',
      success(res) {
        if (res.confirm) {

          wx.request({
            url: 'http://127.0.0.1:8080/news/removeNews',
            data: {
              id: id
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success(res) {
              // 操作成功

              if (res.data == 'success!') {
                wx.showToast({
                  title: '删除成功！',
                  icon: 'none',
                  duration: 1500
                })
                setTimeout(() => {
                  that.onLoad();
                }, 1500)
                // 操作失败
              } else {
                wx.showToast({
                  title: '删除失败！',
                  icon: 'none',
                  duration: 1500
                })
              }
            }
          })
        }
      }
    })
  },



  onShow: function () {
    this.getTabBar().setData({
      active: 3
    })
    this.list();
  },



})