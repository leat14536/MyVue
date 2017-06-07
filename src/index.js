/**
 * Created by Administrator on 2017/6/2 0002.
 */
import init  from './instance/init';
import compile from './instance/compile'
import scope from './instance/scope'
import $mount from './api/lifecycle.js'
import $watch from './api/data';
import element from './instance/element';
import observer from './observer/observer.js';
import bindings from './instance/binding.js';
import directives from './directive'

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
        bindings,
        element,
        scope
    );

    MyVue.options = {
        directives
    };

    window.MyVue = MyVue;
})(window);