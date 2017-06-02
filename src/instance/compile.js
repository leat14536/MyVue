/**
 * Created by Administrator on 2017/6/2 0002.
 */
exports._compile = function () {
    this._compileNode(this.$el);
};

exports._compileNode = function (node) {
    switch (node.nodeType) {
        // text
        case 1:
            this._compileElement(node);
            break;
        // node
        case 3 :
            this._compileText(node);
            break;
        default:
            return;
    }
};

exports._compileElement = function (node) {
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

    node.nodeValue = nodeValue;
};


















