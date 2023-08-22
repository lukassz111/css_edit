"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CssRuleNode = void 0;
const CssNodeType_1 = __importDefault(require("./CssNodeType"));
const CssUtil_1 = __importDefault(require("./CssUtil"));
class CssRuleNode {
    constructor(content) {
        this.Parent = null;
        let splitIndex = content.indexOf(':');
        this.rule = content.substring(0, splitIndex).trim();
        this.value = content.substring(splitIndex + 1);
    }
    canHaveChildren() {
        return false;
    }
    typeCssNode() {
        return CssNodeType_1.default.Rule();
    }
    toCode() {
        return CssUtil_1.default.GenOffset() + this.rule + ":" + this.value + ";";
    }
}
exports.CssRuleNode = CssRuleNode;
//# sourceMappingURL=CssRuleNode.js.map