import { HTTP } from '../util/http.js'
class ClassicModel extends HTTP {
    /* 获取最新期刊信息 */
    getLatest(sCallback) {
        this.request({
            url: 'classic/latest',
            success: (res) => {
                sCallback(res)
                wx.setStorageSync(this._getKey(res.index), res)
                this._setLatestIndex(res.index)
            }
        })
    }


    /* 获取期刊信息 */
    getClassic(index, nextOrPrevious, sCallback) {
        //缓存中查找 or API 写入到缓存中
        //key 确定 key
        let key = nextOrPrevious == 'next' ? this._getKey(index+1) : this._getKey(index-1)
        let classic = wx.getStorageSync(key)
        if(!classic) {
            this.request({
                url: 'classic/' + index + '/' + nextOrPrevious,
                success: (res) => {
                    wx.setStorageSync(this._getKey(res.index), res)
                    sCallback(res)
                }
            })
        } else {
            sCallback(classic)
        }
        
    }

    /* 判断是否是第一期 */
    isFirst (index) {
        return index == 1 ? true : false
    }

    /* 判断是否是最新一期 */
    isLatest (index) {
        let latestIndex = this._getLatestIndex()
        return latestIndex == index ? true : false
    }

    getMyFavor (success) {
        const params = {
            url: 'classic/favor',
            success
        }
        this.request(params)
    }

    /* 存储index */
    _setLatestIndex (index) {
        wx.setStorageSync('latest', index);
    }

    /* 获取index */
    _getLatestIndex () {
        let index = wx.getStorageSync('latest')
        return index
    }

    _getKey (index) {
        let key = 'classic-' + index
        return key
    }
}

export {ClassicModel}