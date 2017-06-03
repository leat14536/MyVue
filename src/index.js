/**
 * Created by Administrator on 2017/6/2 0002.
 */
import init  from './instance/init';
import compile from './instance/compile'
import $mount from './api/lifecycle.js'
import $watch from './api/data';
import observer from './observer/observer.js';
(function(window) {
    function MyVue(options) {
        this._init(options);
    }

    MyVue.prototype = {
        constructor: MyVue,
        observer,
    };

    Object.assign( MyVue.prototype,
        $mount,
        $watch,
    );

    Object.assign( MyVue.prototype,
        init,
        compile,
    );

    window.MyVue = MyVue;
})(window);