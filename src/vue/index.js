import Vue from 'vue'
import App from './App.vue'

new Vue({
    el: '#app',
    render(h){
        return h(App)
    },
    // render: h => h('div', '测试测试'),
    // template: '<div>{{name}}</div>',
    data: () => {
        return {
            name: '1111'
        }
    },
    created () {
        console.log('----------------create----------------')
    }
})
