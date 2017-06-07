/**
 * Created by Administrator on 2017/6/4 0004.
 */
import _ from '../util/index.js';

/**
 * 初始化节点
 * @param el {string} selector
 * @private
 */
exports._initElement = function (el) {
    if (typeof el !== 'string') return;
    let selector = el;
    this.$el = el = document.querySelector(el);
    if (!el) {
        _.warn(`Cannot find element: ${selector}`);
    }
};