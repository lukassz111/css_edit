"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleCssNode = exports.CssNode = exports.CssNodeType = void 0;
var CssNodeType;
(function (CssNodeType) {
    CssNodeType["OneLineComment"] = "OneLineComment";
    CssNodeType["MultiLineComment"] = "MultiLineComment";
    CssNodeType["Import"] = "Import";
    CssNodeType["Undefined"] = "Undefined";
    CssNodeType["SelectorBlockCssNode"] = "SelectorBlockCssNode";
    CssNodeType["MediaBlock"] = "MediaBlock";
    CssNodeType["Rule"] = "Rule";
})(CssNodeType = exports.CssNodeType || (exports.CssNodeType = {}));
class CssNode {
    toJson() {
        return {
            type: this.type,
            raw: this.raw
        };
    }
    constructor(type, raw) {
        this.type = type;
        this.raw = raw;
    }
}
exports.CssNode = CssNode;
class RuleCssNode extends CssNode {
    toJson() {
        return {
            type: this.type,
            name: this.name,
            body: this.body
        };
    }
    constructor(raw) {
        super(CssNodeType.Rule, raw);
        this.name = '';
        this.body = '';
        let splitIndex = raw.indexOf(':');
        this.name = raw.substring(0, splitIndex).trim();
        this.body = raw.substring(splitIndex).trim();
        if (this.body.startsWith(':')) {
            this.body = this.body.substring(1);
        }
        if (this.body.endsWith(';')) {
            this.body = this.body.substring(0, this.body.length - 1);
        }
        this.body = this.body.trim();
    }
}
exports.RuleCssNode = RuleCssNode;
//# sourceMappingURL=CssNode.js.map