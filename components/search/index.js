// components/search/index.js
import {KeywordModel} from '../../models/keyword.js'
const keywordsModel = new KeywordModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[]
  },
  // 组件初始化时调用
  attached() {
    const historyWords = keywordsModel.getHistory()
    const hotWords = keywordsModel.getHot()
    this.setData({
      historyWords
    })
    hotWords.then(res => {
      console.log(res)
      this.setData({
        hotWords:res.hot
      })
    })
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel (event) {
      this.triggerEvent('cancel',{},{})
    },
    onConfirm (event) {
      const word = event.detail.value
      keywordsModel.addToHistory(word)
    }
  }
})
