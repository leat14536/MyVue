/**
 * Created by Administrator on 2017/6/6 0006.
 */
import Observer from '../observer/observer';

/**
 * 初始化观察独享
 * @param data {Object} 就是那个大的对象啦
 * @private
 */
exports._initData = function (data) {
    this.observer = Observer.create(data);
};