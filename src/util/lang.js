/**
 * Created by Administrator on 2017/6/3 0003.
 */
/**
 * 定义对象属性
 * @param obj {Object} 对象
 * @param key {String} 键值
 * @param val {*} 属性值
 * @param enumerable {Boolean} 是否可枚举
 */
exports.define = function (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
};

exports.extend = function (to, from) {
    for(let key in from){
      to[key] = from[key];
    }
};