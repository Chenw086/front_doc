// pages/cate/cate.js
Page({
  // 修改基本
  btnClick() {
    this.setData({
      num: this.data.num + 1
    })
  },

  // 对象上添加或修改
  addValue() {
    // 修改单个的时候
    // this.setData({
    //   'userInfo.name': 'chenwei'
    // })

    // 当修改多个
    this.setData({
      userInfo: {
        ...this.data.userInfo,
        name: '陈伟'
      }
    })
  },

  // 删除
  delValue() {
    // 方式1

    // delete this.data.userInfo.age

    // this.setData({
    //   userInfo: this.data.userInfo
    // })

    // 方式2
    const { age, ...rest } = this.data.userInfo
    this.setData({
      userInfo: rest
    })
  },

  updateList() {
    // 增
    // this.data.list.push(4)
    // this.setData({
    //   list: this.data.list
    // })

    // 改
    // this.setData({
    //   'list[0]': 'chen'
    // })

    // 删, 也是先操作 data 数据然后 setData 通知
    this.data.list.splice(1,1)
    this.setData({
      list: this.data.list
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    userInfo: {
      age: 30
    },
    list: [1, 2, 3]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
})
