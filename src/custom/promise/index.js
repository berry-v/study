/**
 * 高阶函数
 *      把函数作为参数或者返回值的一类函数（回调函数）
 *      或
 *      一个函数的返回值是一个函数
 *  运用：
 *      
 * 
 */
// function coreFun () {
//     // 实现核心逻辑
// }
// Function.prototype.before = function (callBack) {
//     // 扩展成一个公共的方法
// }


/**
 * 柯里化 => 高阶函数
 *  概念： 就是一个函数有多个参数， 我们根据这个函数的参数个数，转化成n个函数， 每一个函数只有一个参数
 */
// function cyrring (fun) {
//     let args = [] // 记录添加个数
//     const inner = (arr=[])=>{ // 每一次的参数
//         args.push(...arr)
//         return args.length >= fun.length? fun(...args):(...args)=>inners(args) //递归， 创建一个函数递归
//     }
//     return inner() // 第一次执行
// }

/**
 * 异步编程 async
 *      异步， 不能直接获取到返回值
 */


/**
 * 发布订阅则模式
 *  两个方法： 发布、 订阅
 */
// let event = {
//     data: {},
//     _arr: [],
//     on(fun){
//         this._arr.push(fun)
//     },
//     emit(key, value){
//         // 收集数据
//         this.data[key] = value
//         // 触发订阅
//         this._arr.forEach(fn=>fn(this.data))
//     }
// }
/**
 * 观察者模式
 * vue2 响应式： 使用的是观察者
 * 
 */

/**
 * Promise 的使用
 * 特点
 *  promise 是一个类
 *  promise 有三个状态 默认的状态 pending resolve reject
 *  状态只有在pending 时候才能改变， 成功不能变成失败， 失败不能变成成功
 *  then
 */

// let promise = new Promise((resolve, reject)=>{
//     resolve('OK')
//     reject('失败')
// })

// promise.then((data) => { // 有两个参数， 成功的、失败的

// }, (error) => {

// })


// 三个状态
const PENDING = 'PENDING' // 默认状态
const FULFILLED  = 'FULFILLED' // 成功
const REJECT = 'REJECT' // 失败
class Promise{
    // 构造方法接收一个回调
    constructor(exector){ // 初始化
        this.state = PENDING // 初始状态 pending
        this.successData = undefined // 保存成功的数据
        this.errorData = undefined // 保存失败的信息
        this.resolveList =  [] // 收集获取成功数据的方法, 成功队列
        this.rejectList =  [] // 收集获取失败数据的方法, 失败队列
        // new Promise 执行
        // 改变状态
        // 由于resolve/reject是在executor内部被调用, 因此需要使用箭头函数固定this指向
        const resolve = (value) => {
            if(this.state === PENDING){ // 状态只能由pending到fulfilled或rejected
                this.successData = value
                this.state = FULFILLED // 变更状态
                this.resolveList.forEach(fn=>fn())
                // this.resolveList.forEach(fn=>fn()) 看到另一种写法是
                // while(this.resolveList.length) { // 这里之所以使用一个队列来储存回调,是为了实现规范要求的 "then 方法可以被同一个 promise 调用多次" 如果使用一个变量而非队列来储存回调,那么即使多次p1.then()也只会执行一次回调
                //     const callback = this.resolveList.shift()
                //     callback(value)
                // }
                
            }
        }
        const reject = (error) => {
            if(this.state === PENDING){
                this.errorData = error
                this.state = REJECT
                this.rejectList.forEach(fn=>fn())
            }
        }
        exector(resolve, reject)
    }
    then(resolveFun, rejectFun){
        // 获取到数据
        // 通过状态判断一下
        if(this.state === FULFILLED){
            resolveFun(this.successData)
        }
        if(this.state === REJECT){
            rejectFun(this.errorData)
        }
        
        if(this.state === PENDING){
            // 收集获取数据的方法
            this.resolveList.push(()=>{
                resolveFun(this.successData)
            })
            this.rejectList.push(()=>{
                rejectFun(this.errorData)
            })
        }
    }
}

export default Promise
