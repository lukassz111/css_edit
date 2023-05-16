"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CssRootNode = exports.CssBlockNode = void 0;
const CssMultilineCommentNode_1 = __importDefault(require("./CssMultilineCommentNode"));
const CssNodeType_1 = __importDefault(require("./CssNodeType"));
const CssOnelineCommentNode_1 = require("./CssOnelineCommentNode");
const CssRuleNode_1 = require("./CssRuleNode");
class CssBlockNode {
    static CreateFromContentString(defBlock, contentBlock, depth) {
        let Childrens = CssRootNode.ParseCssString(contentBlock, depth);
        return new CssBlockNode(defBlock, Childrens, depth);
    }
    constructor(defBlock, Childrens, depth) {
        this.defBlock = defBlock;
        this.Childrens = Childrens;
        this.depth = depth;
    }
    deleteRuleChildren(filter) {
        const realFilter = function (cssNode) {
            if (cssNode.typeCssNode().Type != CssNodeType_1.default.Rule().Type) {
                return false;
            }
            else {
                return filter(cssNode);
            }
        };
        this.deleteChildren(realFilter);
    }
    deleteRuleChildrenRecursive(filter) {
        const realFilter = function (cssNode) {
            if (cssNode.typeCssNode().Type != CssNodeType_1.default.Rule().Type) {
                return false;
            }
            else {
                return filter(cssNode);
            }
        };
        this.deleteChildrenRecursive(realFilter);
    }
    deleteChildren(filter) {
        this.Childrens = this.Childrens.filter(item => !filter(item));
    }
    deleteChildrenRecursive(filter) {
        this.deleteChildren(filter);
        for (let i = 0; i < this.Childrens.length; i++) {
            if (!this.Childrens[i].canHaveChildren()) {
                continue;
            }
            this.Childrens[i].deleteChildrenRecursive(filter);
        }
    }
    canHaveChildren() {
        return true;
    }
    typeCssNode() {
        return CssNodeType_1.default.Block();
    }
    toCode() {
        let x = "";
        x += this.Childrens.map((cssNode, index) => cssNode.toCode()).join("\n");
        return this.defBlock + "{" + x + "}";
    }
}
exports.CssBlockNode = CssBlockNode;
class CssRootNode {
    addCssString(cssString) {
        this.Childrens = CssRootNode.ParseCssString(cssString);
    }
    canHaveChildren() {
        return true;
    }
    typeCssNode() {
        return CssNodeType_1.default.Root();
    }
    toCode() {
        return this.Childrens.map((cssNode, index) => cssNode.toCode()).join("\n");
    }
    constructor() {
        this.Childrens = [];
    }
    deleteRuleChildren(filter) {
        const realFilter = function (cssNode) {
            if (cssNode.typeCssNode().Type != CssNodeType_1.default.Rule().Type) {
                return false;
            }
            else {
                return filter(cssNode);
            }
        };
        this.deleteChildren(realFilter);
    }
    deleteRuleChildrenRecursive(filter) {
        const realFilter = function (cssNode) {
            if (cssNode.typeCssNode().Type != CssNodeType_1.default.Rule().Type) {
                return false;
            }
            else {
                return filter(cssNode);
            }
        };
        this.deleteChildrenRecursive(realFilter);
    }
    deleteChildren(filter) {
        this.Childrens = this.Childrens.filter(item => !filter(item));
    }
    deleteChildrenRecursive(filter) {
        this.deleteChildren(filter);
        for (let i = 0; i < this.Childrens.length; i++) {
            if (!this.Childrens[i].canHaveChildren()) {
                continue;
            }
            this.Childrens[i].deleteChildrenRecursive(filter);
        }
    }
    static ParseCssString(cssString, depth = 0) {
        let Childrens = [];
        let charIndex = 0;
        let inMultilineComment = false;
        let inOneLineComment = false;
        let inBlock = false;
        let content = '';
        let defBlockContent = '';
        let blockDepthCounter = 0;
        let inBlokcMultilineComment = false;
        while (charIndex < cssString.length) {
            let processString = cssString.substring(charIndex);
            if (!inMultilineComment && processString.startsWith('/*') && !inBlock) {
                inMultilineComment = true;
                content = '';
                charIndex += 2;
            }
            else if (inMultilineComment) {
                if (!processString.startsWith('*/')) {
                    content += processString[0];
                    charIndex++;
                }
                else {
                    inMultilineComment = false;
                    charIndex += 2;
                    Childrens.push(new CssMultilineCommentNode_1.default(content));
                    content = '';
                }
            }
            else if (!inOneLineComment && processString.startsWith('//') && !inBlock) {
                inOneLineComment = true;
                content = '';
                charIndex += 2;
            }
            else if (inOneLineComment) {
                if (processString.startsWith('\n')) {
                    inOneLineComment = false;
                    charIndex++;
                    Childrens.push(new CssOnelineCommentNode_1.CssOnelineCommentNode(content));
                    content = '';
                }
                else {
                    content += processString[0];
                    charIndex++;
                }
            }
            else if (!inBlock && !inMultilineComment && !inOneLineComment) {
                if (!processString.startsWith('{')) {
                    if (processString.startsWith(';')) {
                        content = content.trim();
                        Childrens.push(new CssRuleNode_1.CssRuleNode(content));
                        content = '';
                        charIndex++;
                    }
                    else if (processString.length == 1) {
                        content += processString[0];
                        content = content.trim();
                        Childrens.push(new CssRuleNode_1.CssRuleNode(content));
                        content = '';
                        charIndex++;
                    }
                    else {
                        content += processString[0];
                        charIndex++;
                    }
                }
                else {
                    defBlockContent = content;
                    content = '';
                    charIndex++;
                    inBlock = true;
                    blockDepthCounter = 0;
                }
            }
            else if (inBlock && !inMultilineComment && !inOneLineComment) {
                if (processString.startsWith('/*') && !inBlokcMultilineComment) {
                    content += '/*';
                    charIndex += 2;
                    inBlokcMultilineComment = true;
                }
                else if (processString.startsWith('*/') && inBlokcMultilineComment) {
                    content += '*/';
                    charIndex += 2;
                    inBlokcMultilineComment = false;
                }
                else if (processString.startsWith('{') && !inBlokcMultilineComment) {
                    content += processString[0];
                    charIndex++;
                    blockDepthCounter++;
                }
                else if (processString.startsWith('}') && !inBlokcMultilineComment) {
                    if (blockDepthCounter == 0) {
                        inBlock = false;
                        charIndex++;
                        content = content.trim();
                        defBlockContent = defBlockContent.trim();
                        Childrens.push(CssBlockNode.CreateFromContentString(defBlockContent, content, depth + 1));
                        content = '';
                        defBlockContent = '';
                    }
                    else {
                        content += processString[0];
                        charIndex++;
                        blockDepthCounter--;
                    }
                }
                else {
                    content += processString[0];
                    charIndex++;
                }
            }
            else {
                charIndex++;
            }
        }
        return Childrens;
    }
}
exports.CssRootNode = CssRootNode;
//# sourceMappingURL=CssNode.js.map