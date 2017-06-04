/**
 * Created by Administrator on 2017/6/2 0002.
 */
exports._init = function(options){
    //

    this.$options = options;
    this.$data = options.data;
    this.$el = document.querySelector(options.el);
    this.$template = this.$el.cloneNode(true);

    this.observer = this.observer.create(this.$data);
    this.observer.on('set',this.$mount.bind(this));

    this.$mount();
}