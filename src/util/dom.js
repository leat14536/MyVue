/**
 * Created by Administrator on 2017/6/4 0004.
 */
exports.before = function (el, target) {
    target.parentNode.insertBefore(el, target);
};

exports.remove = function (el) {
    el.parentNode.removeChild(el);
}; 