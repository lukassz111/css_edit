"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaBlockCssNode = void 0;
const CssNode_1 = require("./CssNode");
const BlockCssNode_1 = require("./BlockCssNode");
class MediaBlockCssNode extends BlockCssNode_1.BlockCssNode {
    constructor(raw) {
        super(CssNode_1.CssNodeType.MediaBlock, raw);
    }
}
exports.MediaBlockCssNode = MediaBlockCssNode;
//# sourceMappingURL=MediaBlockCssNode.js.map