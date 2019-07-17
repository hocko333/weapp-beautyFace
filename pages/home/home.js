// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: '/assets/placeholder.jpg',
    result: null
  },
  detectImage(src) {
    const that = this
    that.setData({
      result: null
    })
    wx.showLoading({
      title: '分析中...'
    })
    wx.uploadFile({
      url: 'https://ai.qq.com/cgi-bin/appdemo_detectface',
      filePath: src,
      name: 'image_file',
      success(res) {
        wx.hideLoading()
        const result = JSON.parse(res.data)
        console.log(result)
        // 分析失败
        if (result.ret !== 0) return wx.showToast({
          title: '分析失败，请重试...',
          icon: 'none'
        })
        // 分析成功
        that.setData({
          result: result.data.face[0]
        })
      }
    })
  },
  getImage(type = 'camera') {
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: [type],
      success(res) {
        const image = res.tempFiles[0]
        if (image.size > 1024 * 1000) {
          return wx.showToast({
            title: '图片太大，请换张小点的~',
            icon: 'none'
          })
        }
        that.setData({
          image: image.path
        })
        that.detectImage(image.path)
      }
    })
  },
  handleSelect(e) {
    if (e.type === 'tap') {
      this.getImage('camera')
    } else if (e.type === 'longpress') {
      this.getImage('album')
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})