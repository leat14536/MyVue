/**
 * Created by Administrator on 2017/6/2 0002.
 */
import arrayAugmentations from '../observer/array-augmentations';

const ARRAY = 0;
const OBJECT = 1;

/*
*   数据绑定
*   冒泡
* */

/**
 * 观察者构造函数
 * @param value {Object} 数据对象
 * @param type {Int} 数据对象的类型(分为对象和数组)
 * @constructor
 */
export default class Observer {
    constructor (value, type) {
        this.value = value;
        // TODO 这里为什么enumerable一定要为false,否则会触发死循环
        // value.$observer = this;
        Object.defineProperty(value, '$observer', {
            value: this,
            enumerable: false,
            writable: true,
            configurable: true
        });
        if (type === ARRAY) {
            value.__proto__ = arrayAugmentations;
            this.link(value);
        } else if (type === OBJECT) {
            this.walk(value);
        }
    }
}

/**
*根据不同的数据类型,调用observer构造函数
* @param value {Any} 数据
* @returns {Observer}
*/
Observer.create = function (value) {
    if (Array.isArray(value)) {
        return new Observer(value, ARRAY);
    } else if (typeof value === 'object') {
        return new Observer(value, OBJECT);
    }
};

Observer.prototype.walk = function (obj) {
    let val;
    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) return;

        val = obj[key];

        // 递归
        this.observe(key, val);

        this.convert(key, val);

    }
};

Observer.prototype.observe = function (key, val) {
    let ob = Observer.create(val);
    if (!ob) return;
    ob.parent = {
        key,
        ob: this
    }
};

Observer.prototype.convert = function (key, val) {
    let ob = this;
    Object.defineProperty(this.value, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            return val
        },
        set: function (newVal) {
            if (newVal === val) return;
            val = newVal
            ob.notify('set', key, newVal);
            ob.notify(`set:${key}`, key, newVal)
        }
    })
};

/**
 * 触发消息, 并且将消息逐层往上传播
 */
Observer.prototype.notify = function (event, path, val) {
    this.emit(event, path, val);
    let parent = this.parent;
    //有parent才会冒泡
    if (!parent) return;
    let ob = parent.ob;
    ob.notify(event, path, val);
};

/**
 * 触发执行回调函数
 * @param event {string} 事件类型
 * @param event {path} 事件触发路径
 */
Observer.prototype.emit = function (event, path, val) {
    this._cbs = this._cbs || {};
    let callbacks = this._cbs[event]

    if (!callbacks) return;

    callbacks = callbacks.slice(0);
    callbacks.forEach((cb, i) => {
        callbacks[i].apply(this, arguments);
    });
};

/**
 * 订阅事件
 * @param event {string} 事件类型
 * @param fn {Function} 对调函数
 * @returns {Observer} 观察者对象
 */
Observer.prototype.on = function (event, fn) {
    this._cbs = this._cbs || {};
    if (!this._cbs[event]) {
        this._cbs[event] = [];
    }
    this._cbs[event].push(fn);

    // 级联调用
    return this;
};

/**
* 这个方法是用来处理如下情况: var ary = [1,{name:liangshaofeng}]
* 也就是说,当数组的某些项是一个对象的时候,
* 那么需要给这个对象创建observer监听它
* @param items {Array} 待处理数组
*/
Observer.prototype.link = function (items) {
    items.forEach((value, index) => {
        this.observe(index, value);
    });
};
