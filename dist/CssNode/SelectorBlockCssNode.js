"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectorBlockCssNode = void 0;
const CssNode_1 = require("./CssNode");
const BlockCssNode_1 = require("./BlockCssNode");
class SelectorBlockCssNode extends BlockCssNode_1.BlockCssNode {
    constructor(raw) {
        super(CssNode_1.CssNodeType.SelectorBlockCssNode, raw);
    }
}
exports.SelectorBlockCssNode = SelectorBlockCssNode;
//# sourceMappingURL=SelectorBlockCssNode.js.map