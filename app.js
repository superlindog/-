// app.js
App({
  onLaunch() {
    this.overShare()
  },

  siteInfo: require('siteInfo.js'),

  globalData: {
    userInfo: null,
    classList: null, //分类查询
    jobCondition: null, //岗位条件查询
    keyword: '', //全局搜索关键字
    navigateBack: false
  },

  getClassList: () => {
    let app = getApp()
    let uuid = app.siteInfo.uuid

    return new Promise((resolve, reject) => {
      if (app.globalData.classList) return resolve(app.globalData.classList)

      wx.request({
        url: app.siteInfo.siteRoot + 'getClassList',
        data: {
          uuid: uuid
        },
        method: "POST",
        header: 'Content-Type: application/json',
        success: (e) => {
          if (e.data && e.data.resultCode && e.data.resultCode == '000000') {
            app.globalData.classList = e.data.data.list
            resolve(app.globalData.classList)
          } else {

          }
        }
      })
    })
  },

  getJobCondition: () => {
    let app = getApp()
    let uuid = app.siteInfo.uuid

    return new Promise((resolve, reject) => {
      if (app.globalData.jobCondition) return resolve(app.globalData.jobCondition)

      wx.request({
        url: app.siteInfo.siteRoot + 'getJobCondition',
        data: {
          uuid: uuid
        },
        method: "POST",
        header: 'Content-Type: application/json',
        success: (e) => {
          if (e.data && e.data.resultCode && e.data.resultCode == '000000') {
            app.globalData.jobCondition = e.data.data
            resolve(app.globalData.jobCondition)
          } else {

          }
        }
      })
    })
  },

  getJobList: function (data) {
    let app = getApp()
    /* data.uuid = app.siteInfo.uuid */
    data.uuid='abd00f7c7c444a74b5505d2795337995'

    return new Promise((resolve, reject) => {
      wx.request({
        url: app.siteInfo.siteRoot + 'getJobList',
        data: data,
        method: "POST",
        header: 'Content-Type: application/json',
        success: (e) => {
          if (e.data && e.data.resultCode && e.data.resultCode == '000000') {
            resolve(e.data.data)
          } else {
            wx.showToast({
              title: '获取岗位失败',
              icon: 'error'
            })
          }
        }
      })
    })
  },

  getCompanyList: function (data) {
    let app = getApp()
    data.uuid='abd00f7c7c444a74b5505d2795337995'
    /* data.uuid = app.siteInfo.uuid */

    return new Promise((resolve, reject) => {
      wx.request({
        url: app.siteInfo.siteRoot + 'getCompanyList',
        data: data,
        method: "POST",
        header: 'Content-Type: application/json',
        success: (e) => {
          if (e.data && e.data.resultCode && e.data.resultCode == '000000') {
            resolve(e.data.data)
          } else {
            wx.showToast({
              title: '获取企业失败',
              icon: 'error'
            })
          }
        }
      })
    })
  },

  getCompanyByName: function (data) {
    let app = getApp()
    data.uuid = app.siteInfo.uuid

    return new Promise((resolve, reject) => {
      wx.request({
        url: app.siteInfo.siteRoot + 'getCompanyByName',
        data: data,
        method: "POST",
        header: 'Content-Type: application/json',
        success: (e) => {
          if (e.data && e.data.resultCode && e.data.resultCode == '000000') {
            resolve(e.data.data)
          } else {
            wx.showToast({
              title: '获取企业详情失败',
              icon: 'error'
            })
          }
        }
      })
    })
  },

  getCompanyClassList: function (data) {
    let app = getApp()
    data.uuid = app.siteInfo.uuid
    console.log(data)
    return new Promise((resolve, reject) => {
      wx.request({
        url: app.siteInfo.siteRoot + 'getCompanyClassList',
        data: data,
        method: "POST",
        success: (e) => {
          if (e.data && e.data.resultCode && e.data.resultCode == '000000') {
            resolve(e.data.data)
          } else {
            wx.showToast({
              title: '获取企业分类失败',
              icon: 'error'
            })
          }
        }
      })
    })
  },

  getCompanyCondition: function (data) {
    let app = getApp()
    data.uuid = app.siteInfo.uuid
    
    return new Promise((resolve, reject) => {
      if (app.globalData.companyCondition) return resolve(app.globalData.companyCondition)

      wx.request({
        url: app.siteInfo.siteRoot + 'getCompanyCondition',
        data: data,
        method: "POST",
        success: (e) => {
          if (e.data && e.data.resultCode && e.data.resultCode == '000000') {
            app.globalData.companyCondition = e.data.data
            resolve(app.globalData.companyCondition)
          } else {
            wx.showToast({
              title: '获取企业查询条件失败',
              icon: 'error'
            })
          }
        }
      })
    })
  },

  setArrayItemValue: function (array, value) {
    let no = true

    array.forEach((item, index) => {
      if (item == value) {
        array.splice(index, 1)
        no = false
      }
    })

    no && array.push(value)

    console.log("setArrayItemValue", array)
    return array
  },

  overShare: function () {
    //监听路由切换
    wx.onAppRoute(function (res) {
      //获取加载的页面
      let pages = getCurrentPages(),
        view = pages[pages.length - 1],
        data = null
      if (view) {
        view.onShareAppMessage = function () {
          var u = this.route
          let title_share = ''
          let imgurl = '/images/share.jpg'

          let ret = {
            title: '杭州云聘',
            imageUrl: '/images/shareimg.jpg',
            path: 'pages/index/index'
          }

          console.log('onShareAppMessage data ', data, ' ret ', ret)

          return ret
        }
      }
    })
  }
})