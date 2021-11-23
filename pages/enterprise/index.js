// index.js
// 获取应用实例
const app = getApp()

const topDisTence=1520;
Page({
  data: {
    curIndex: '',
    kw:'',
    list: [],
    list1:[],
    jobCondition: [],
    searchCondition: {
      classId:[],
      companysize: [],
      companytype: [],
      coname: "",
      industrytype: [],
      pageNum: 1,
      pageSize: 999,
    },
    showSearchCondition:{},
   isTabFixed:false,
   isBgFixed:false,
   showBackTop:false,
   tabScrollTop:0,
   bgScrollTop:0,
   isSelect: false,
   isActive:false,
   tabIdx:1
  },
 onLoad:function(){
  this.getClassData()
  this.getData()
 },
  onShow: function () {
    if (this.data.list.length == 0) {
      this.getCompanyData()
    }
    // 获取导航栏距离顶部的高度
    wx.createSelectorQuery().select('#tab').boundingClientRect(rect=>{
      /* console.log(rect) */
      this.data.tabScrollTop=rect.top
    }).exec()
    // 获取筛选框和输入框距离顶部的高度
    /* wx.createSelectorQuery().select('#bg').boundingClientRect(rect=>{ */
      /* console.log(rect) */
    /*   this.data.bgScrollTop=rect.top
    }).exec() */
  },
  getCompanyClassListdata: function () {
    let self = this
    app.getCompanyClassList(this.data.searchCondition).then((res) => {
      console.log("getCompanyClassListdata", res)
      self.setData({
        list: res.list
      })
    })
  },
  getCompanyData: function () {
    let self = this
    wx.showLoading({
      title: '加载中',
    })
    app.getCompanyList(this.data.searchCondition).then((res) => {
      wx.hideLoading()
      console.log("getCompanyData", res)
      self.setData({
        list: res.list
      })
    })
  },
  getCompanyConditiondata: function () {
    let self = this
    app.getCompanyCondition(this.data.searchCondition).then((res) => {
      console.log("getCompanyConditionData", res)
      self.setData({
        list: res.list
      })
      console.log(self.data);
    })
  },
  getData: function () {
    let self = this
   app.getCompanyCondition({}).then((res) => {
      console.log("getCompanyConditionData", res)
      self.setData({
        jobCondition: res
      })
    })
  },
  getClassData: function () {
    let self = this
    app.getCompanyClassList({}).then((res) => {
      console.log("getCompanyClassListData", res)
      self.setData({
        list1: res
      })
    })
  },
  getJobConditiondata: function () {
    let self = this
    app.getJobCondition(this.data.searchCondition).then((res) => {
      console.log("getJobConditiondata", res)
      self.setData({
        list: res
      })
    })
  },
  search: function (e) {
    let searchCondition = this.data.searchCondition
    searchCondition.coname =e.detail.value
    this.setData({
      searchCondition: searchCondition
    })

    this.getCompanyData()
  },
  getKeyword:function(e){
   let keyword=e.detail.value;
   this.setData({
     kw:keyword
   })
  },
  handleSearch:function(e){
    let kw=this.data.kw;
    let searchValue = this.data.searchCondition;
    searchValue.coname=kw;
    this.setData({
      searchCondition: searchValue
    })
    this.getCompanyData()
  },
  tapTabOne(e){
    let id = e.currentTarget.dataset.id
    let searchCondition = this.data.searchCondition
    searchCondition.classId =[]
    this.setData({
      tabIdx: id,
      searchCondition:searchCondition
    })
    this.getCompanyData()
  },
  tapTabIdx(e) {
    let searchCondition = this.data.searchCondition
    let id = e.currentTarget.dataset.id
    searchCondition.classId =[id]
    console.log(id)
    console.log(this.data.searchCondition.classId)
    this.setData({
      tabIdx: id,
      searchCondition:searchCondition
    })
    this.getCompanyData()
  } ,
  tapToCorpDetail(e) {
    let coname = e.currentTarget.dataset.coname;
    
    wx.navigateTo({ 
      url: '/pages/enterprise/detail?coname=' + coname,
    })
  },
  changeStatus(e) {
    this.setData({
     isActive: !this.data.isActive
    })
    console.log(this.data.isActive);
   },
   tapArrayItemValue: function (e) {
    let searchCondition = this.data.searchCondition
    let key = e.currentTarget.dataset.key
    let item = e.currentTarget.dataset.item

     let array = searchCondition[key]
     searchCondition[key] = app.setArrayItemValue(array, item)
    /* searchCondition[key] = []
    searchCondition[key].push(item) */

    this.setData({
      searchCondition: searchCondition
    })
  },
  determine_filter:function(){
    this.setData({
      isActive:false
    })
    this.getCompanyData()
  },
  reset:function(){
    let searchCondition = this.data.searchCondition
    searchCondition.companytype=[],
    searchCondition.industrytype=[]
    this.setData({
      searchCondition:searchCondition
    })
  },
  layout:function(){
    this.setData({
      isActive:false
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
    /* console.log(scrollTop) */

    const flag1=scrollTop>=this.data.tabScrollTop;
    if(flag1 && !this.data.isTabFixed){
      this.setData({
        isTabFixed:true
      })
    } else if (!flag1 && this.data.isTabFixed) {
      this.setData({
        isTabFixed:false
      })
    }
    // console.log(this.data.isTabFixed)
    /* const flag2=scrollTop>=this.data.bgScrollTop;
    if(flag2 && !this.data.isBgFixed){
      this.setData({
        isBgFixed:true
      })
    } else if (!flag2 && this.data.isBgFixed) {
      this.setData({
        isBgFixed:false
      })
    } */
  }
})
  