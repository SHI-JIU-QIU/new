// pages/md_news/md_news.js
var util = require('../../utils/util.js')
Page({

  data: {
    id: '',
    title: '',
    content: '',
    img: '',
    tipImg: '',
    tipContent: '',
    tipTitle: ''
  },

  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.showNew();
  },

  saveTitle(e) {
    if (e.detail.value == '') {
      this.setData({
        tipTitle: true,
        title: e.detail.value,
      })
    } else {
      this.setData({
        title: e.detail.value,
        tipTitle: false,
      })
    }
    console.log(this.data.title);
  },

  saveContent(e) {
    if (e.detail.value == '') {
      this.setData({
        tipContent: true,
        content: e.detail.value,
      })
    } else {
      this.setData({
        content: e.detail.value,
        tipContent: false,
      })
    }
    console.log(this.data.content);
  },

  add_img() {
    let that = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res.tempFiles[0].tempFilePath)
        that.setData({
          img: res.tempFiles[0].tempFilePath
        })
      }
    })
  },

  //根据id获取修改的新闻
  showNew() {
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
        console.log(res)
        that.setData({
          title: res.data[0].title,
          content: res.data[0].content,
          img: res.data[0].img
        })
      }
    })
  },


  //修改新闻
  editNew() {
    // 获取当前日期
    var cTime = util.formatTime(new Date())


    if (this.data.title == '') {
      this.setData({
        tipTitle: true,
      })
    }
    if (this.data.content == '') {
      this.setData({
        tipContent: true,
      })
    }
    if (this.data.img == '../../images/拍照.jpg') {
      this.setData({
        tipImg: true,
      })
    }


    if (this.data.title == '' || this.data.img == '' || this.data.content == '') {
      wx.showToast({
        title: '请完整填写表单',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    console.log(cTime);
    // 发送新增请求
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8080/news/updateNews',
      data: {
        id: that.data.id,
        title: that.data.title,
        img: that.data.img,
        content: that.data.content,
        cTime: cTime
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        // 操作成功
        console.log(res);
        if (res.data == 'success!') {
          wx.showToast({
            title: '修改成功！',
            icon: 'none',
            duration: 1500
          })
          setTimeout(() => {
            wx.switchTab({
              url: '../md_news_list/md_news_list',
            })
          }, 1500)
          that.setData({
            title: '',
            img: '',
            content: '',
          })
          // 操作失败
        } else {
          wx.showToast({
            title: '修改失败！',
            icon: 'none',
            duration: 1500
          })
          that.setData({
            tip: res.data
          })
        }
      }
    })
  }
})