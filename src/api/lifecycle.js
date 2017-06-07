/**
 * Created by Administrator on 2017/6/2 0002.
 */

exports.$mount = function (el) {
    // 合法性判断等, 有待补充
    this._initElement(el);

    // 解析、渲染DOM
    this._compile();
};