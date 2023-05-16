"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CssRootNode = void 0;
const CssNodeType_1 = __importDefault(require("./CssNodeType"));
const CssUtil_1 = __importDefault(require("./CssUtil"));
class CssRootNode {
    addCssString(cssString) {
        this.Childrens = CssUtil_1.default.ParseCssString(cssString);
    }
    canHaveChildren() {
        return true;
    }
    typeCssNode() {
        return CssNodeType_1.default.Root();
    }
    toCode() {
        return this.Childrens.map((cssNode, index) => {
            let offset = CssUtil_1.default.GenOffset();
            let result = cssNode.toCode().split('\n').map(v => v.startsWith(offset) ? v.substring(offset.length) : v).join('\n');
            return result;
        }).join("\n");
    }
    constructor() {
        this.Childrens = [];
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
    deleteEmptyNodes() {
        const filter = (cssNode) => {
            if (cssNode.canHaveChildren()) {
                let cssChildrenNode = cssNode;
                if (cssChildrenNode.Childrens.length == 0) {
                    return true;
                }
                return false;
            }
            else {
                return false;
            }
        };
        let deletedItems = 0;
        do {
            deletedItems = this.deleteChildrenRecursive(filter);
        } while (deletedItems > 0);
    }
}
exports.CssRootNode = CssRootNode;
//# sourceMappingURL=CssRootNode.js.map