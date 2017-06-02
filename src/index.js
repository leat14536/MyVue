/**
 * Created by Administrator on 2017/6/2 0002.
 */
import init  from './instance/init.js';
import comple from './instance/compile.js'
import $mount from './api/lifecycle.js'
(function(window) {
    function MyVue(options) {
        this._init(options);
    }

    MyVue.prototype = {
        constructor: MyVue
    };

    Object.assign( MyVue.prototype,
        $mount
    );

    Object.assign( MyVue.prototype,
        init,
        comple
    );

    window.MyVue = MyVue;
})(window);