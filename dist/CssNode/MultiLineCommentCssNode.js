"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiLineCommentCssNode = void 0;
const CssNode_1 = require("./CssNode");
class MultiLineCommentCssNode extends CssNode_1.CssNode {
    constructor(raw) {
        super(CssNode_1.CssNodeType.MultiLineComment, raw);
    }
}
exports.MultiLineCommentCssNode = MultiLineCommentCssNode;
//# sourceMappingURL=MultiLineCommentCssNode.js.map