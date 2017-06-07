/**
 * Created by Administrator on 2017/6/2 0002.
 */
/*
*   渲染节点
* */
import Directive from '../directive.js';
import textParser from '../parse/text.js';
import dirParser from '../parse/directive.js';
import _ from '../util/index.js';

exports._compile = function () {
   this._compileNode(this.$el);
};

exports._compileNode = function (node) {
    switch (node.nodeType) {
        // node
        case 1:
            this._compileElement(node);
            break;
        // text
        case 3 :
            this._compileTextNode(node);
            break;
        default:
            return;
    }
};

exports._compileElement = function (node) {
    if (node.hasChildNodes()) {
        Array.from(node.childNodes).forEach(this._compileNode, this);
    }
};

exports._compileText = function (node) {
    let tokens = textParser.parse(node.nodeValue);
    if (!tokens) return;

    tokens.forEach((token) => {
        if (token.tag) {
            // 指令节点
            let value = token.value;
            let el = document.createTextNode('');
            _.before(el, node);
            this._bindDirective('text', value, el);
        } else {
            // 普通文本节点
            let el = document.createTextNode(token.value);
            _.before(el, node);
        }
    });

    _.remove(node);

};
exports._compileTextNode = function (node) {
    let tokens = textParser.parse(node.nodeValue);
    if (!tokens) return;
    tokens.forEach((token) => {
        if (token.tag) {
            let value = token.value;
            let el = document.createTextNode('');
            _.before(el, node);
            this._bindDirective('text', value, el);
        }else{
            let el = document.createTextNode(token.value);
            _.before(el, node);
        }
    })
    _.remove(node);
}

/**
 * 生成指令
 * @param name {string} 'text' 代表是文本节点
 * @param value {string} 例如: user.name  是表示式
 * @param node {Element} 指令对应的el
 * @private
 */
//this指向vue
exports._bindDirective = function (name, value, node) {
    debugger
    let descriptors = dirParser.parse(value);
    let dirs = this._directives;
    descriptors.forEach((descriptor) => {
        dirs.push(
            new Directive(name, node, this, descriptor)
        )
    });
};













