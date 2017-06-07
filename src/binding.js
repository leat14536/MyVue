/**
 * Created by Administrator on 2017/6/4 0004.
 */
function Binding() {
    this._subs = [];
}

/**
 * 给你一个键值, 如果原来就有这个键值对应的binding, 那么乖乖返回就好了
 * 否则就新建一个再返回
 * @param key {string} 形如: "name"
 * @returns {Binding}
 * @private
 */
Binding.prototype._addChild = function (key, child) {
    child = child || new Binding();
    this[key] = child;
    return child;
};

/**
* 这个就是把watcher塞到_subs数组里面啦
* 之后触发update的话,是会遍历这个数组滴
* @param sub {Watcher}
* @private
*/
Binding.prototype._addSub = function (sub) {
    this._subs.push(sub);
};

export default Binding;