// promise
import Promise from './promise/index.js'

let promise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        // reject('失败')
        resolve('成功')
    }, 300)
})

promise.then((data) => { // 有两个参数， 成功的、失败的
    console.log('success', data)
}, (error) => {
    console.log('error', error)
})
// promise.then 可以被调用多次
promise.then((data) => {
    console.log('success111', data)
}, (error) => {
    console.log('error111', error)
})


let Vue = require('./vue/vue.js') 

new Vue({
    $el: '#main',
    name: 'test',
    data: {
        str: '哈哈哈哈哈哈哈哈， 太搞笑啦'
    },
    methods:{
        btnClick (e) {
            this.str = '不， 也不是很搞笑'
        }
    }
})
