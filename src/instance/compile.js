/**
 * Created by Administrator on 2017/6/2 0002.
 */
/*
*   渲染节点
* */
let fragment, currentNodeList = [];
exports._compile = function () {
    fragment = document.createDocumentFragment();
    currentNodeList.push(fragment);

    this._compileNode(this.$template);

    this.$el.parentNode.replaceChild(fragment,this.$el);
    this.$el = document.querySelector(this.$options.el);
};

exports._compileNode = function (node) {
    switch (node.nodeType) {
        // node
        case 1:
            this._compileElement(node);
            break;
        // text
        case 3 :
            this._compileText(node);
            break;
        default:
            return;
    }
};

exports._compileElement = function (node) {
    let newNode = document.createElement(node.tagName);

    if (node.hasAttributes()) {
        let attrs = node.attributes;
        Array.from(attrs).forEach((attr) => {
            newNode.setAttribute(attr.name, attr.value);
        });
    }

    let currentNode = currentNodeList[currentNodeList.length - 1].appendChild(newNode);

    if (node.hasChildNodes()) {
        currentNodeList.push(currentNode);
        Array.from(node.childNodes).forEach(this._compileNode, this);
    }

    currentNodeList.pop();
};

exports._compileText = function (node) {
    let nodeValue = node.nodeValue;

    if (nodeValue === '') return;

    let patt = /{{[\s\w]+}}/g;
    let ret = nodeValue.match(patt);

    if (!ret) return;

    ret.forEach((value) => {
        let property = value.replace(/[{}\s]/g, '');
        nodeValue = nodeValue.replace(value, this.$data[property]);
    }, this);

    currentNodeList[currentNodeList.length - 1].appendChild(document.createTextNode(nodeValue));
    //this.currentNode.appendChild(document.createTextNode(nodeValue));
    //node.nodeValue = nodeValue;
};


















