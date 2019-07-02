import {
    HTTP
} from '../util/http-p.js'
class KeywordModel extends HTTP {
    key='q'
    maxLength = 10
    getHistory () {
        const words = wx.getStorageSync(this.key)
        if(!words) {
            return []
        }else {
            return words
        }
    }

    getHot() {
        return this.request({
            url:'/book/hot_keyword'
        })
    }

    addToHistory(keyword) {
        let words = this.getHistory()
        const has =  words.includes(keyword)
        //是否存在
        if(!has) {
            const length = words.length
            //限制长度
            if(length >= this.maxLength) {
                words.pop()
            }
            words.unshift(keyword)
        }
        wx.setStorageSync(this.key,words)
    }
}

export {KeywordModel}