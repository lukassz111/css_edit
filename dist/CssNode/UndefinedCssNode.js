"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UndefinedCssNode = void 0;
const CssNode_1 = require("./CssNode");
class UndefinedCssNode extends CssNode_1.CssNode {
    constructor(raw) {
        super(CssNode_1.CssNodeType.Undefined, raw);
    }
}
exports.UndefinedCssNode = UndefinedCssNode;
//# sourceMappingURL=UndefinedCssNode.js.map