/**
 * Created by Administrator on 2017/6/4 0004.
 */
let lang = require('./lang');
let extend = lang.extend;

extend(exports, lang);
extend(exports, require('./dom'));
extend(exports, require('./debug')); 