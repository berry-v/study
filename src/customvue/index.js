import Vue from 'vue'

new Vue({
    el: '#app',
    render: h => h('div', '测试测试'),
    created () {
        console.log('----------------create----------------')
    }
})