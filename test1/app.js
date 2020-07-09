//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //快递查询
  getKuaiDiInfo:function(no,e) {
    wx.request({
      url: 'https://route.showapi.com/64-19',
      data: {
        'showapi_appid': '100',
        'showapi_sign': '698d51a19d8a121ce581499d7b701668',
        'com':'auto',
        'nu':no,
      },
      method: 'post',
      dataType: 'json',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        console.log(res);
        e(res.showapi_res_body.data);
      }
    })
    // console.log("app.js---快递单号："+no);
    // e([{"time":"2018","status":"111"},{"time":"2019","status":"222"},{"time":"2020","status":"333"}]);
  },
  globalData: {
    userInfo: null
  }
})