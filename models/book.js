import {
    HTTP
} from '../util/http-p.js'

class BookMode extends HTTP {
    getHotList () {
        return this.request('classic/hot_list')
    }
}