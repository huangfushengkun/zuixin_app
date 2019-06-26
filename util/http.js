
import {config} from "../config.js"
const tips = {
    1: '抱歉，出现了一个未知错误',
    1005:'开发者key无效',
    3000:'期刊不存在'
}
class HTTP {
    request (params) {

        wx.request({
            url:config.api_base_url + params.url,
            methods:params.methods,
            data:params.data,
            header: {
                'content-type':'application/json',
                'appkey':config.appkey
            },
            success: (res) => {
                let code = res.statusCode.toString()
                if(code.startsWith('2')) {
                    params.success(res.data)
                } else {
                    let error_code = res.data.error_code
                    this._show_error(error_code)
                }
            },
            fail: (err) => {
                this._show_error(1)
            }
        })
    }

    _show_error(error_code=1) {
        wx.showToast({
            title:tips[error_code],
            icon:'none',
            duration:2000
        })
    }
}

export {HTTP}