"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CssBlockNode = void 0;
const CssNodeType_1 = __importDefault(require("./CssNodeType"));
const CssUtil_1 = __importDefault(require("./CssUtil"));
class CssBlockNode {
    static CreateFromContentString(defBlock, contentBlock, depth) {
        let Childrens = CssUtil_1.default.ParseCssString(contentBlock, depth);
        return new CssBlockNode(defBlock, Childrens, depth);
    }
    constructor(defBlock, Childrens, depth) {
        this.Childrens = Childrens;
        this.depth = depth;
        for (let i = 0; i < Childrens.length; i++) {
            if (this.Childrens[i].typeCssNode().Type == CssNodeType_1.default.Rule().Type) {
                this.Childrens[i].Parent = this;
            }
        }
        this.defBlock = defBlock.trim();
        while (this.defBlock.match(/  /gm) != null) {
            this.defBlock = this.defBlock.replace(/  /gm, ' ');
        }
    }
    deleteChildren(filter) {
        let length = this.Childrens.length;
        this.Childrens = this.Childrens.filter(item => !filter(item));
        let newLength = this.Childrens.length;
        return length - newLength;
    }
    deleteChildrenRecursive(filter) {
        let deleted = this.deleteChildren(filter);
        for (let i = 0; i < this.Childrens.length; i++) {
            if (!this.Childrens[i].canHaveChildren()) {
                continue;
            }
            deleted += this.Childrens[i].deleteChildrenRecursive(filter);
        }
        return deleted;
    }
    canHaveChildren() {
        return true;
    }
    typeCssNode() {
        return CssNodeType_1.default.Block();
    }
    toCode() {
        let x = "";
        let depthXoffset = CssUtil_1.default.GenOffset();
        x += this.Childrens.map((cssNode, index) => cssNode.toCode()).join("\n");
        x = this.defBlock + " {\n" + x + "\n}";
        x = x.split('\n').map(v => {
            return depthXoffset + v;
        }).join('\n');
        return x;
    }
}
exports.CssBlockNode = CssBlockNode;
//# sourceMappingURL=CssBlockNode.js.map