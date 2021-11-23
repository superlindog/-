// pages/jobList/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classList: [],
    selectArea: 0,
    openselect: 0,
    selwage: '',
    seledu: '',
    seljob: '',
    wages: [],
    edunames: [],
    jobs: [],
    jobCondition: [],
    jobList: [], //岗位列表
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
    this.getJobData();
    this.getData();
    this.getSelArea();
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
    if (app.globalData.navigateBack) {
      let searchCondition = this.data.searchCondition
      searchCondition.nameLike = app.globalData.keyword
      let value = 'searchCondition.pageNum'
      this.setData({
        searchCondition: searchCondition,
        jobList: [],
        [value]: 1
      })

      app.globalData.navigateBack = false

      this.getJobData()
    }
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
    let value = 'searchCondition.pageNum'
    this.setData({
      [value]: this.data.searchCondition.pageNum + 1
    })
    this.getJobData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  tapSel1: function (e) {
    let area = e.currentTarget.dataset.sel
    let id = e.currentTarget.dataset.selid
    let value = "searchCondition.diyclass"
    this.setData({
      selectArea: area,
      [value]: [id],
      jobList:[]
    })
    this.getJobData();
  },

  opensel: function () {
    if (this.data.openselect == 0) {
      this.setData({
        openselect: 1,
      })
    } else {
      this.setData({
        openselect: 0,
      })
    }
  },

  none: function () {

  },

  selwage: function (e) {
    let wageName = e.currentTarget.dataset.wagename;
    let arr=this.data.searchCondition.providesalaryname
    let value = 'searchCondition.providesalaryname'
    if(this.data.searchCondition.providesalaryname.indexOf(wageName)==-1){
     arr.push(wageName)
     this.setData({
       [value]:arr
     })
    }
    else {
      arr.splice(this.data.searchCondition.providesalaryname.indexOf(wageName), 1);
      this.setData({
        [value]:arr
      })
    }
   
  },

  seledu: function (e) {
    let eduName = e.currentTarget.dataset.eduname;
    let arr=this.data.searchCondition.degreefrom
    let value = 'searchCondition.degreefrom'
    if(this.data.searchCondition.degreefrom.indexOf(eduName)==-1){
      arr.push(eduName)
      this.setData({
        [value]:arr
      })
     }
     else {
       arr.splice(this.data.searchCondition.degreefrom.indexOf(eduName), 1);
       this.setData({
         [value]:arr
       })
     }
  },

  seljob: function (e) {
    let jobName = e.currentTarget.dataset.jobname;
    let arr=this.data.searchCondition.funtype
    let value = 'searchCondition.funtype'
    if(this.data.searchCondition.funtype.indexOf(jobName)==-1){
      arr.push(wageName)
      this.setData({
        [value]:arr
      })
     }
     else {
       arr.splice(this.data.searchCondition.funtype.indexOf(jobName), 1);
       this.setData({
         [value]:arr
       })
     }
  },

  getData: function () {
    let self = this
    app.getJobCondition().then((res) => {
      self.setData({
        jobCondition: res
      })
    })
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

  getSelArea: function () {
    let self = this
    app.getClassList().then((res) => {
      self.setData({
        classList: res[0].list
      })
    })
  },

  reset: function () {
    let value1 = 'searchCondition.providesalaryname'
    let value2 = 'searchCondition.degreefrom'
    let value3 = 'searchCondition.funtype'
    this.setData({
      [value1]: [],
      [value2]: [],
      [value3]: []
    })
  },

  searchbtn: function () {
    this.setData({
      jobList:[],
    })
    this.getJobData()
    this.opensel()
  },

  tosearch: function(){
    wx.navigateTo({
      url: '/pages/jobList/search',
    })
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