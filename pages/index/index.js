// pages/index/index.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    showvideo:false,
    videoSrc:'',
    openselect: 0,
    showjoin: false,
    getleftTimeOut: null,
    slideWidth: '', //滑块宽
    slideLeft: 0, //滑块位置
    slideRatio: 0,
    windowWidth: 0,
    windowHeight: 0,
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
    corplist: [{
        img: 'baisheng.jpg',
        coname: '百胜餐饮（广东）有限公司'
      },
      {
        img: 'wanb.jpg',
        coname: '万宝电器有限公司'
      },
      {
        img: 'union.jpg',
        coname: '中国联合网络通信有限公司广州市分公司'
      },
      {
        img: '51job.jpg',
        coname: '前锦网络信息技术（上海）有限公司广州分公司'
      },
      {
        img: 'cswluo.jpg',
        coname: '华夏城视网络电视股份有限公司'
      },
      {
        img: 'smda.jpg',
        coname: '广东速美达自动化股份有限公司'
      },
      {
        img: 'zgjshe.jpg',
        coname: '广东重工建设监理有限公司'
      },
      {
        img: 'hualtz.jpg',
        coname: '广州华立投资有限公司'
      },
      {
        img: 'huashu.jpg',
        coname: '深圳华数机器人有限公司'
      },
      {
        img: 'aot.jpg',
        coname: '深圳市奥拓电子股份有限公司'
      },
      {
        img: 'ctchang.jpg',
        coname: '深圳市长天长空智能设备科技有限公司'
      },
      {
        img: 'maie.jpg',
        coname: '深圳市麦尔蒂斯智能科技有限公司'
      },
      {
        img: 'sanhuan.jpg',
        coname: '潮州三环（集团）股份有限公司'
      },
      {
        img: 'lgjt.jpg',
        coname: '蓝鸽集团有限公司'
      }, {
        img: 'baishi.jpg',
        coname: '百事（中国）有限公司'
      },
      {
        img: 'liyang.jpg',
        coname: '广东利扬芯片测试股份有限公司'
      },
      {
        img: 'meiy.jpg',
        coname: '广东美宜佳便利店有限公司'
      },
      {
        img: 'lshiz.jpg',
        coname: '广州绿十字制药股份有限公司'
      },
      {
        img: 'hel.jpg',
        coname: '广州市禾绿回转寿司饮食有限公司'
      },
      {
        img: 'kait.jpg',
        coname: '深圳市开源通达供应链有限公司'
      },
    ],
    videoList: [{
      "title": "在杭州 见未来",
      "poster": "http://cache.51job.com/cms-file/20210804/143806573.jpg",
      "video": "http://evp.chinaceotv.com/cms-video/20210804/142537-1100439707AT2101.mp4"
    }, {
      "title": "杭州不仅是一首诗",
      "poster": "http://cache.51job.com/cms-file/20210804/144015777.jpg",
      "video": "http://evp.chinaceotv.com/cms-video/20210804/142353-1100439707AT2101.mp4"
    }, {
      "title": "来杭州 向未来",
      "poster": "http://cache.51job.com/cms-file/20210804/143957911.jpg",
      "video": "http://evp.chinaceotv.com/cms-video/20210804/142215-1100439707AT2101.mp4"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var systemInfo = wx.getSystemInfoSync();
    self.setData({
      windowWidth: systemInfo.windowWidth,
      windowHeight: systemInfo.windowHeight
    });
    self.getRatio();
    self.getData()
    self.getJobData()
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

  tapCompanyJob(e) {
    let coname = e.currentTarget.dataset.coname

    wx.navigateTo({
      url: '/pages/enterprise/detail?coname=' + coname,
    })
  },

  getRatio: function () {
    var self = this;

    var _totalLength = self.data.corplist.length * 236; //分类列表总长度
    var _ratio = 160 / _totalLength * (750 / this.data.windowWidth); //滚动列表长度与滑条长度比例
    var _showLength = 750 / _totalLength * 160; //当前显示红色滑条的长度(保留两位小数)
    this.setData({
      slideWidth: _showLength,
      totalLength: _totalLength,
      slideRatio: _ratio
    })

  },
  //slideLeft动态变化
  getleft: function (e) {
    this.setData({
      slideLeft: e.detail.scrollLeft * this.data.slideRatio
    })
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
    let arr = this.data.searchCondition.providesalaryname
    let value = 'searchCondition.providesalaryname'
    if (this.data.searchCondition.providesalaryname.indexOf(wageName) == -1) {
      arr.push(wageName)
      this.setData({
        [value]: arr
      })
    } else {
      arr.splice(this.data.searchCondition.providesalaryname.indexOf(wageName), 1);
      this.setData({
        [value]: arr
      })
    }

  },

  seledu: function (e) {
    let eduName = e.currentTarget.dataset.eduname;
    let arr = this.data.searchCondition.degreefrom
    let value = 'searchCondition.degreefrom'
    if (this.data.searchCondition.degreefrom.indexOf(eduName) == -1) {
      arr.push(eduName)
      this.setData({
        [value]: arr
      })
    } else {
      arr.splice(this.data.searchCondition.degreefrom.indexOf(eduName), 1);
      this.setData({
        [value]: arr
      })
    }
  },

  seljob: function (e) {
    let jobName = e.currentTarget.dataset.jobname;
    let arr = this.data.searchCondition.funtype
    let value = 'searchCondition.funtype'
    if (this.data.searchCondition.funtype.indexOf(jobName) == -1) {
      arr.push(wageName)
      this.setData({
        [value]: arr
      })
    } else {
      arr.splice(this.data.searchCondition.funtype.indexOf(jobName), 1);
      this.setData({
        [value]: arr
      })
    }
  },


  openjoin: function () {
    if (this.data.showjoin) {
      this.setData({
        showjoin: false
      })
    } else {
      this.setData({
        showjoin: true
      })
    }
  },


  tapSurvey: function () {
    let sid = "8800931"
    let hash = "c3b7"
    wx.navigateToMiniProgram({
      appId: 'wxebadf544ddae62cb',
      path: `pages/survey/index?sid=${sid}&hash=${hash}`,
      success(res) {}
    })
  },

  getData: function () {
    let self = this
    app.getJobCondition().then((res) => {
      self.setData({
        jobCondition: res
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
      jobList: [],
    })
    this.getJobData()
    this.opensel()
  },

  tosearch: function () {
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

  tocompany: function () {
    wx.navigateTo({
      url: '/pages/enterprise/index',
    })
  },

  tapToCorpDetail(e) {
    let coname = e.currentTarget.dataset.coname;

    wx.navigateTo({
      url: '/pages/enterprise/detail?coname=' + coname,
    })
  },

  tovideo: function (e) {
    let src = e.currentTarget.dataset.src;
    /* wx.navigateTo({
      url: '/pages/index/video?src=' + src,
    }) */
    this.setData({
      showvideo:true,
      videoSrc:src
    })
  },
  hidevideo:function(){
    this.setData({
      showvideo:false
    })
  }

})