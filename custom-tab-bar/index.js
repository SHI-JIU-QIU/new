Component({
  data: {
    active: 0,
    list: [{
        pagePath: "/pages/index/index",
        iconPath: "home-o",
        selectedIconPath: "home",
        text: "首页"
      },
      {
        pagePath: "/pages/add_news/add_news",
        iconPath: "add-o",
        selectedIconPath: "add",
        text: "新增新闻"
      },
      {
        pagePath: "/pages/md_news_list/md_news_list",
        iconPath: "edit",
        selectedIconPath: "edit",
        text: "修改新闻"
      },
      {
        pagePath: "/pages/de_news/de_news",
        iconPath: "close",
        selectedIconPath: "close-o",
        text: "删除新闻"
      },
      {
        pagePath: "/pages/user/user",
        iconPath: "user-o",
        selectedIconPath: "user",
        text: "个人中心"
      }
    ]
  },

  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      this.setData({
        active: event.detail
      });
      wx.switchTab({
        url: this.data.list[this.data.active].pagePath,
      })
    },
  }
})