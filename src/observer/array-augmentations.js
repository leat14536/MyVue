/**
 * Created by Administrator on 2017/6/2 0002.
 */
const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayAugmentations = [];

aryMethods.forEach((method) => {
    let original = Array.prototype[method];
    arrayAugmentations[method] = function () {
        console.log('我被改变啦!');
        return original.apply(this, arguments);
    };
});

export default arrayAugmentations;