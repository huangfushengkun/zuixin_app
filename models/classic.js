import { HTTP } from '../util/http.js'
class ClassicModel extends HTTP {
    /* 获取最新期刊信息 */
    getLatest(sCallback) {
        this.request({
            url: 'classic/latest',
            success: (res) => {
                sCallback(res)
                this._setLatestIndex(res.index)
            }
        })
    }

    /* 获取上一期的、期刊信息 */
    getClassic(index, nextOrPrevious, sCallback) {
        this.request({
            url: 'classic/' + index + '/' + nextOrPrevious,
            success: (res) => {
                sCallback(res)
            }
        })
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

    /* 存储index */
    _setLatestIndex (index) {
        wx.setStorageSync('latest', index);
    }

    /* 获取index */
    _getLatestIndex () {
        let index = wx.getStorageSync('latest')
        return index
    }

}

export {ClassicModel}