/**
 * Created by Administrator on 2017/6/2 0002.
 */
import Watcher from '../watcher';


exports.$watch = function (exp, cb) {
    new Watcher(this, exp, cb, this);
    /*let _fn = function () {
        fn(arguments[2]);
    };

    let pathAry = key.split('.');

    if (pathAry.length === 1) {
        this.$data.$observer.on(`set:${key}`, _fn.bind(this))
    } else {
        let _temp = this.$data;
        let lastProperty = pathAry.pop();

        pathAry.forEach((property) => {
            _temp = _temp[property]
        });
        _temp.$observer.on(`set:${lastProperty}`, _fn.bind(this));*/
    //}
   //this.$data.$observer.on(`set:${key}`, _fn.bind(this))
};