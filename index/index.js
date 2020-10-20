const db = wx.cloud.database().collection("take_up1")
Page({
    mixins: [require('../base/CustomPage')],
    data: {
        date: "2020-10-18",
        time: "12:01",
        formData: {},
        rules: [
        {
            name: 'number',
            rules: {required: true, message: '学号必填'},
        }, {
            name: 'mobile',
            rules: [{required: true, message: '手机号必填'}, {mobile: true, message: 'mobile格式不对'}],
        }, {
            name: 'question',
            rules: {required: true, message: '电脑问题必填'},
        }, {
            name: 'date',
            rules: {required: true, message: '日期必填'},
        }]
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value,
            [`formData.date`]: e.detail.value
        })
    },
    formInputChange(e) {
        const {field} = e.currentTarget.dataset;
        this.setData({
            [`formData.${field}`]: e.detail.value
        });
        // var that = this;
        // console.log(that.data.formData)
    },
    kindToggle: function (e) {
        var id = e.currentTarget.id, list = this.data.list;
        for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open
            } else {
                list[i].open = false
            }
        }
        this.setData({
            list: list
        });
    },
    changeTheme: function() {
        console.log(this.data);
        getApp().themeChanged(this.data.theme === 'light' ? 'dark' : 'light');
    },
    submitForm() {
        this.selectComponent('#form').validate((valid, errors) => {
            console.log('valid', valid, errors)
            if (!valid) {
                const firstError = Object.keys(errors)
                if (firstError.length) {
                    this.setData({
                        error: errors[firstError[0]].message
                    })

                }
            } else {
                var that = this;
                wx.showToast({
                    title: '校验通过'
                }),
                console.log(that.data.formData)
                db.add({
                    data : {
                        date: that.data.formData.date,
                        mobile: that.data.formData.mobile,
                        number: that.data.formData.number,
                        question: that.data.formData.question,
                    },
                    success(res){
                        console.log("添加成功",res)
                    },
                    fail(res){
                        console.log("添加失败",res)
                    }
                })
            }
        })
    }
});
