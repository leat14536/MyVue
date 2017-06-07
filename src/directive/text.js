/**
 * Created by Administrator on 2017/6/7 0007.
 */
/**
 * 这个就是textNode对应的更新函数啦
 */
exports.update = function () {
    let properties = this.expression.split('.');
    let value = this.vm.$data;
    properties.forEach((property) => {
        value = value[property];
    });
    this.el[this.attr] = value;
    console.log(`更新了DOM-${this.expression}`, value);
};