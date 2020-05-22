//index.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    cxqd:[],
    mx:[],
    zltz:[],
    ysry:[],
    pj:[],
    dsf:[],
    hj:[],
    cf:[],
    active:'cxqd'
  },
  navigator(e){
   var goTo= e.currentTarget.dataset;
   wx.navigateTo({
     url: '../details/details?type='+goTo.type+'&index='+goTo.index,
   })
  },
  onLoad: function() {
    var that=this;
    wx.request({
      url: 'http://127.0.0.1:4000/mx',
      header:{'Content-Type':'application/x-www-form-urlencoded'},
      method:'GET',
      success(res){
        that.setData({
          mx:res.data.results
        })
        
        app.data.mx=res.data.results;
      },
      fail(res){console.log(res)}
    });
    console.log(app.data)
    wx.request({
      url: 'http://127.0.0.1:4000/cxqd',
      header:{'Content-Type':'application/x-www-form-urlencoded'},
      method:'GET',
      success(res){
        that.setData({
          cxqd:res.data.results
        });
        app.data.cxqd=res.data.results;
      },
      fail(res){console.log(res)}
    });
    wx.request({
      url: 'http://127.0.0.1:4000/zltz',
      header:{'Content-Type':'application/x-www-form-urlencoded'},
      method:'GET',
      success(res){
        that.setData({
          zltz:res.data.results
        })
        app.data.zltz=res.data.results;
      },
      fail(res){console.log(res)}
    });
    wx.request({
      url: 'http://127.0.0.1:4000/ysry',
      header:{'Content-Type':'application/x-www-form-urlencoded'},
      method:'GET',
      success(res){
        that.setData({
          ysry:res.data.results
        })
        app.data.ysry=res.data.results;
      },
      fail(res){console.log(res)}
    });
    wx.request({
      url: 'http://127.0.0.1:4000/pj',
      header:{'Content-Type':'application/x-www-form-urlencoded'},
      method:'GET',
      success(res){
        that.setData({
          pj:res.data.results
        })
        app.data.pj=res.data.results;
      },
      fail(res){console.log(res)}
    });
    wx.request({
      url: 'http://127.0.0.1:4000/dsf',
      header:{'Content-Type':'application/x-www-form-urlencoded'},
      method:'GET',
      success(res){
        that.setData({
          dsf:res.data.results
        })
        app.data.dsf=res.data.results;
      },
      fail(res){console.log(res)}
    });
    wx.request({
      url: 'http://127.0.0.1:4000/hj',
      header:{'Content-Type':'application/x-www-form-urlencoded'},
      method:'GET',
      success(res){
        that.setData({
          hj:res.data.results
        })
        app.data.hj=res.data.results;
      },
      fail(res){console.log(res)}
    });
    wx.request({
      url: 'http://127.0.0.1:4000/cf',
      header:{'Content-Type':'application/x-www-form-urlencoded'},
      method:'GET',
      success(res){
        that.setData({
          cf:res.data.results
        })
        app.data.cf=res.data.results;
      },
      fail(res){console.log(res)}
    });
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
