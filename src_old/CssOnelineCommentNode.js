"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CssOnelineCommentNode = void 0;
const CssNodeType_1 = __importDefault(require("./CssNodeType"));
class CssOnelineCommentNode {
    constructor(comment) {
        this.comment = comment;
    }
    canHaveChildren() {
        return false;
    }
    typeCssNode() {
        return CssNodeType_1.default.OnelineComment();
    }
    toCode() {
        return '//' + this.comment + "\n";
    }
}
exports.CssOnelineCommentNode = CssOnelineCommentNode;
//# sourceMappingURL=CssOnelineCommentNode.js.map