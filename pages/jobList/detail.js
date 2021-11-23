// pages/jobList/details.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobList:[],
    searchCondition: {
      address: [],
      category: 1,
      coid: [],
      companysizename: [],
      coname: [],
      ctmid: [],
      degreefrom: [],
      divid: [],
      divname: [],
      diyclass: [],
      funtype: [],
      indtype: [],
      isurgency: [],
      jobareaname: [],
      jobid: [],
      jobinfo: [],
      jobname: "",
      jobnum: [],
      joborder: [],
      jobwelf: [],
      language: [],
      major: [],
      mark: [],
      nameLike: "",
      pageNum: 1,
      pageSize: 10,
      poscode: [],
      providesalaryname: [],
      term: [],
      workareaname: [],
      workyearname: [],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id='searchCondition.jobid'
    let jobid=options.jobid
    console.log(options.jobid)
    this.setData({
      [id]:[jobid]
    })

    this.getJobData()
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

  },


  getJobData: function () {
    let self = this
    wx.showLoading({
      title: '加载中',
    })
    app.getJobList(this.data.searchCondition).then((res) => {
      wx.hideLoading()
      console.log("getJobData", res)
      var arr = self.data.jobList
      for (var i = 0; i < res.list.length; i++) {
        arr.push(res.list[i])
      }
      self.setData({
        jobList: arr
      });
    })
  },

  tapTo51Mini(e) {
    let self=this
    let url = 'pages/special/jobdetail/jobdetail?o=1&f=' + app.siteInfo.jobfrom + '&jobid=' + self.data.searchCondition.jobid[0]
    console.log(self.data.searchCondition.jobid[0])
    console.log('tapTo51Mini', url)

    wx.navigateToMiniProgram({
      appId: 'wx1131e5c71e668b5d',
      path: 'pages/special/jobdetail/jobdetail?o=1&f=' + app.siteInfo.jobfrom + '&jobid=' + self.data.searchCondition.jobid[0],
      success(res) {
        // 打开成功
      }
    })
  },

  tapToCorpDetail(e) {
    let coname = e.currentTarget.dataset.coname;

    wx.navigateTo({
      url: '/pages/enterprise/detail?coname=' + coname,
    })
  },
})