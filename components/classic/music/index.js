// components/classic/music/index.js
import {classicBeh} from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],  //可以继承多个

  properties: {
    src:String,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing:false,
    pauseSrc: 'images/player@waitting.png',
    playSrc: 'images/player@playing.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function (event) {
      this.setData({
        playing:!this.data.playing
      })
      console.log(this.properties.src)
      mMgr.src = this.properties.src
      mMgr.title = this.properties.title
    }
  }
})
