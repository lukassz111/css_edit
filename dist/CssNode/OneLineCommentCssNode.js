"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneLineCommentCssNode = void 0;
const CssNode_1 = require("./CssNode");
class OneLineCommentCssNode extends CssNode_1.CssNode {
    constructor(raw) {
        super(CssNode_1.CssNodeType.OneLineComment, raw);
    }
}
exports.OneLineCommentCssNode = OneLineCommentCssNode;
//# sourceMappingURL=OneLineCommentCssNode.js.map