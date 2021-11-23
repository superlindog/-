// pages/corp/detail.js
const app = getApp()

const topDisTence=1520;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIdx: 1,
    co: [],
    jobList: [],
    searchCondition: {
      name: ''
    },
    showBackTop:false,
    searchConditionJob: {
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
      pageSize: 500,
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
    if (options.coname) {
      let searchCondition = this.data.searchCondition
      searchCondition.name = options.coname

      let searchConditionJob = this.data.searchConditionJob
      searchConditionJob.coname.push(options.coname)

      this.setData({
        searchCondition: searchCondition,
        searchConditionJob: searchConditionJob
      })
    }

    this.getCompanyData()
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

  getCompanyData: function () {
    let self = this
    app.getCompanyByName(this.data.searchCondition).then((res) => {
      console.log("getCompanyData", res)
      if (!res.coname || !res.coinfo|| !res.companytype|| !res.ctmid|| !res.industrytype1 ){
        res = {
          coname: this.data.searchConditionJob.coname,
          coinfo: this.data.searchConditionJob.coname + '诚聘',
          companytype: this.data.searchConditionJob.coname,
          ctmid: this.data.searchConditionJob.coname,
          industrytype1: this.data.searchConditionJob.coname,
        }
      }

      res.coinfo = res.coinfo.replace(/<br>/ig, "\r\n").replace(/&nbsp;/g, "　")

      self.setData({
        co: res
      })
    })
  },

  getJobData: function () {
    let self = this
    wx.showLoading({
      title: '加载中',
    })
    app.getJobList(this.data.searchConditionJob).then((res) => {
      wx.hideLoading()
      console.log("getJobData", res)
      self.setData({
        jobList: res.list
      })
    })
  },

  tapTabIdx(e) {
    let id = e.currentTarget.dataset.id

    this.setData({
      tabIdx: id
    })
  },
  onPageScroll(options){
    const scrollTop=options.scrollTop;
    const flag=scrollTop>=topDisTence;
    if(flag!=this.data.showBackTop){
      this.setData({
        showBackTop:flag
      })
    }
  },

  tojobdetail(e) {
    let jobid = e.currentTarget.dataset.jobid
    wx.navigateTo({
      url: '/pages/jobList/detail?jobid=' + jobid,
    })
  },

  tapToCorpDetail(e) {
    let coname = e.currentTarget.dataset.coname;

    wx.navigateTo({
      url: '/pages/enterprise/detail?coname=' + coname,
    })
  },

})
