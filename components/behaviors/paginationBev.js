const paginationBev = Behavior({
    data: {
        booksArray:[],
        bookTotal:0
    },

    methods: {
        setMoreData(booksArray) {
            const tempArray = this.data.booksArray.concat(booksArray)
            this.setMoreData({
                booksArray: tempArray
            })
        },

        getCurrentStart() {
            return this.data.booksArray.length
        },

        setRotal(bookTotal) {
            this.data.bookTotal = bookTotal
        },
        hasMore (){
            if (this.data.booksArray.length >= this.data.bookTotal) {
                return false
            } else {
                return true
            }
        }
    }
})