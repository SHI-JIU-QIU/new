// pages/add_news/add_news.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: "",
    tipTitle: '',
    tipContent: '',
    tipImg: '',
    img: '../../images/拍照.jpg'
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
        content: e.detail.value,
        tipContent: true,
      })
    } else {
      this.setData({
        content: e.detail.value,
        tipContent: false,
      })
    }
  },

  add_img() {
    let that = this
    // if (this.data.img == '../../images/拍照.jpg') {
    //   this.setData({
    //     tipImg: true,
    //   })
    // }
    wx.chooseMedia({
      count: 1,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res.tempFiles[0].tempFilePath)
        that.setData({
          img: res.tempFiles[0].tempFilePath,
          tipImg: false
        })
      }
    })
  },

  //添加新闻
  add_new() {
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

    if (this.data.title == '' || this.data.img == '../../images/拍照.jpg' || this.data.content == '') {
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
      url: 'http://127.0.0.1:8080/news/addNews',
      data: {
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
        console.log('success', res);
        wx.showToast({
          title: '保存成功！',
          icon: 'none',
          duration: 1500,
        })
        setTimeout(() => {
          wx.switchTab({
            url: '../index/index',
          })
        }, 1500)
        // 操作成功
        if (res.data == 'success!') {
          that.setData({
            title: '',
            img: '../../images/拍照.jpg',
            content: '',
            tip: '',
            ctime: ''
          })
          // 操作失败
        } else {
          wx.showToast({
            title: '保存失败！',
            icon: 'none',
            duration: 1500
          })
          that.setData({
            tip: res.data
          })
        }
      }
    })
  },


  onShow: function () {
    this.getTabBar().setData({
      active: 1
    })
  },


})