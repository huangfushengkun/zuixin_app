import {
    HTTP
} from '../util/http-p.js'

class BookModel extends HTTP {
    getHotList () {
        return this.request({
            url:'book/hot_list'
        })
    }
    // 获取点赞状态
    getMyBookCount() {
      return this.request({
        url:'/book/favor/count'
      })
    }
    //获取书籍详细信息
    getDetail(bid) {
      return this.request({
        url:`book/${bid}/detail`
      })
    }
      // 获取当前书籍的点赞状态
    getLikeStatus (bid) {
      return this.request({
        url:`book/${bid}/favor`
      })
    }

    // 书籍的短评信息
    getComments(bid) {
      return this.request({
        url:`book/${bid}/short_comment`
      })
    }

}

export {BookModel}