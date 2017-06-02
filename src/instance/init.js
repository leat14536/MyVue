/**
 * Created by Administrator on 2017/6/2 0002.
 */
exports._init = function(options){
    //

    this.$data = options.data;
    this.$el = document.querySelector(options.el);

    this.$mount();
}