import CustomPage from '../base/CustomPage'

Component({
    data: {
        date: "2020-10-18",
        time: "12:01",
    },
    methods: {
        bindDateChange: function (e) {
            this.setData({
                date: e.detail.value,
                [`formData.date`]: e.detail.value
            })
        },
        kindToggle: function (e) {
            const id = e.currentTarget.id,
                list = this.data.list
            for (let i = 0, len = list.length; i < len; ++i) {
                if (list[i].id == id) {
                    list[i].open = !list[i].open
                } else {
                    list[i].open = false
                }
            }
            this.setData({
                list: list
            })
        },
        themeToggle() {
            const App = getApp()
    
            if (App.themeChanged) {
                if (App.globalData.theme === 'light') {
                    App.themeChanged('dark')
                } else {
                    App.themeChanged('light')
                }
            }
        }
    },
});
Component({
    properties: {},
    data: {
      args: {
        withCredentials: true,
        lang: 'zh_CN'
      }
    },
    methods: {
      loginSuccess: function (res) {
        console.log(res.detail);
      },
      loginFail: function (res) {
        console.log(res);
      }
    }
  })
