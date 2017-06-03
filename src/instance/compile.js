/**
 * Created by Administrator on 2017/6/2 0002.
 */
/*
*   渲染节点
* */
exports._compile = function () {
    this.fragment = document.createDocumentFragment();
    this._compileNode(this.$template);
    this.$el.innerHTML = "";
    this.fragment.childNodes.forEach((child) => {
        this.$el.appendChild(child.cloneNode(true));
    });
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
    this.currentNode = document.createElement(node.tagName);
    this.fragment.appendChild(this.currentNode);

    if ( node.hasChildNodes()) {
        Array.from(node.childNodes).forEach(this._compileNode, this);
    }
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

    this.currentNode.appendChild(document.createTextNode(nodeValue));
    //node.nodeValue = nodeValue;
};


















