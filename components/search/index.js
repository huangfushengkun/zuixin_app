// components/search/index.js
import {KeywordModel} from '../../models/keyword.js'
import {BookModel} from '../../models/book.js'

/* 引入行为 */
import {paginationBev} from '../behaviors/paginationBev.js'
const keywordsModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  /* 使用行为 */
  // behaviors:[paginationBev],

  properties: {
    more:{
      type:Number,
      observer:'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    booksArray:[],
    bookTotal:0,
    searchBlock:true,
    value:'',
    flage:true
  },

  // 组件初始化时调用
  attached() {
    this.setData({
      historyWords:keywordsModel.getHistory()
    })

    keywordsModel.getHot().then(res => {
      this.setData({
        hotWords:res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      const length = this.data.booksArray.length
        //判断 搜索存在  是都还有数据  上一个请求是否完成 
      if(!this.data.value || length ==this.data.bookTotal || !this.data.flage) {
        return
      }

      this.setData({
        flage:false
      })

      wx.showLoading()

      bookModel.search(length,this.data.value).then(res => {
        this.setData({
          booksArray:[...this.data.booksArray,...res.books],
          flage:true
        })
        wx.hideLoading()
      }, () => { //避免死锁
        this.setData({flage:true})
      })

    },
    onCancel (event) {
      this.triggerEvent('cancel',{},{})
    },
    onConfirm (event) {
      this.setData({
        searchBlock:false,
        // booksArray:[]
      })
      wx.showLoading()
      const word = event.detail.value  || event.detail.text
      bookModel.search(0,word).then(res => {
        this.setData({
          booksArray:res.books,
          bookTotal:res.total,
          value:word
        })
        wx.hideLoading()
        keywordsModel.addToHistory(word)
      })
    },
    // 点击close按钮
    colseSearch (event) {
      this.setData({
        searchBlock:true,
        value:''
      })
    }
  }
})
