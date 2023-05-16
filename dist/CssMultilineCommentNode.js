"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CssNodeType_1 = __importDefault(require("./CssNodeType"));
class CssMultilineCommentNode {
    constructor(comment) {
        this.comment = comment;
    }
    canHaveChildren() {
        return false;
    }
    typeCssNode() {
        return CssNodeType_1.default.MultilineComment();
    }
    toCode() {
        return '/*' + this.comment + '*/';
    }
}
exports.default = CssMultilineCommentNode;
//# sourceMappingURL=CssMultilineCommentNode.js.map