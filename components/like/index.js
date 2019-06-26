// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean
    },
    count: {
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // like:true,
    // count:99,
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(event) {
      // 自定义事件
      let like = this.properties.like
      let count = this.properties.count

      count = like?count-1:count+1
      this.setData({
        count,
        like:!like
      })
      // 激活
      let behavior = this.properties.like ? 'like' : 'cancel'
      this.triggerEvent('like',{
        behavior
      },{})
    }
  }
})
