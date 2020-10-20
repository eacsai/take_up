const themeListeners = []

App({
    onLaunch: function () {
        wx.cloud.init({
            env: 'takeup-0gq6i75d5ce4ba0b'
        })
        },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    },
    themeChanged(theme) {
        this.globalData.theme = theme
        themeListeners.forEach((listener) => {
            listener(theme)
        })
    },
    watchThemeChange(listener) {
        if (themeListeners.indexOf(listener) < 0) {
            themeListeners.push(listener)
        }
    },
    unWatchThemeChange(listener) {
        const index = themeListeners.indexOf(listener)
        if (index > -1) {
            themeListeners.splice(index, 1)
        }
    },
    globalData: {
        hasLogin: false,
        theme: 'light',
        GRID_DEMO_URL: '/index/index',
        iconTabbar: '/index/images/icon_tabbar.png'
    }
})
