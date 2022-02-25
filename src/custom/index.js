let Vue = require('./vue/vue.js') 

new Vue({
    $el: '#main',
    data: {
        str: '哈哈哈哈哈哈哈哈， 太搞笑啦'
    },
    methods:{
        btnClick (e) {
            this.str = '不， 也不是很搞笑'
        }
    }
})
