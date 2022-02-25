class Vue {
    constructor (options) {
        if(!options.$el) {
            console.error('$el is undefined')
        }
        this.$el = document.querySelector(options.$el)
        this.$data = options.data
        this.$options = options
        this.$watchEvent = {}
        this.proxyData()
        this.observe()
        this.compile(this.$el)
    }

    // 劫持data， 并且给对象赋值
    proxyData () {
        for(let key in this.$data){
            Object.defineProperty(this, key, {
                get(){
                    return this.$data[key]
                },
                set(value){
                    this.$data[key] = value
                }
            })
        }
    }
    // 劫持数据变化进行更新视图
    observe(){
        for (let key in this.$data) {
            let value = this.$data[key]
            let that = this
            console.log(this)
            Object.defineProperty(this.$data, key, {
                get(){
                    return value
                },
                set(val){
                    value = val
                    // 如果修改了， 执行update方法
                    if(that.$watchEvent[key]){
                        that.$watchEvent[key].forEach((item, i)=>{
                            item.update()
                        })
                    }
                }
            })
        }

    }
    /**
     * 编译解析
     */
    compile (node) {
        node.childNodes.forEach((item, i) => {
            if (item.nodeType === 1) { // 元素节点
                // 判断点击事件
                if (item.hasAttribute('@click')){
                    const vmKey = item.getAttribute('@click').trim()
                    item.addEventListener('click', (event) => {
                        this.eventFun = this.$options.methods[vmKey].bind(this)
                        this.eventFun(event)
                    })
                }
                // 判断v-model
                if (item.hasAttribute('v-model')){
                    const vmKey = item.getAttribute('v-model').trim()
                    item.value = this[vmKey]
                    item.addEventListener('input', (event) => {
                        this[vmKey] = item.value
                    })
                    
                }
                if(item.childNodes.length > 0){
                    this.compile(item)
                }
            } else if(item.nodeType === 3) { // 文本节点
                const reg = /\{\{(.*?)\}\}/g
                const text = item.textContent
                item.textContent = text.replace(reg, (match, vmkey)=>{
                    vmkey = vmkey.trim()
                    if(this.hasOwnProperty(vmkey)){
                        let watcher = new Watch(this, vmkey, item,'textContent')
                        if(!this.$watchEvent[vmkey]){
                            this.$watchEvent[vmkey] = []
                        }
                        this.$watchEvent[vmkey].push(watcher) 
                    }
                    return this.$data[vmkey.trim()]
                })
            }
        
        });
    }
}

// 文本节点更新
class Watch{
    constructor(vm, key, node, attr){
        // Vue 对象
        this.vm = vm
        // 就是data的数据
        this.key = key
        // 节点
        this.node = node
        // 
        this.attr = attr
    }
    update(){
        // 数据发现改变， 更新视图
        this.node[this.attr] = this.vm[this.key]
        // 文本节点.textContent
        // item.textContent = this
    }
}

// 先劫持数据发生的改变（先修改date中的护具）， 如果数据改变了执行update方法（更新视图）。从而实现数据双向绑定


module.exports = Vue
