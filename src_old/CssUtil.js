"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CssBlockNode_1 = require("./CssBlockNode");
const CssMultilineCommentNode_1 = __importDefault(require("./CssMultilineCommentNode"));
const CssNodeType_1 = __importDefault(require("./CssNodeType"));
const CssOnelineCommentNode_1 = require("./CssOnelineCommentNode");
const CssRuleNode_1 = require("./CssRuleNode");
function ParseCssString(cssString, depth = -1) {
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
                    Childrens.push(CssBlockNode_1.CssBlockNode.CreateFromContentString(defBlockContent, content, depth + 1));
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
function CreateFilterDeleteCssTypeNode(cssTypeNode) {
    return (cssNode) => {
        let d = false;
        for (let i = 0; i < cssTypeNode.length; i++) {
            if (cssTypeNode[i].Type == cssNode.typeCssNode().Type) {
                d = true;
                break;
            }
        }
        return d;
    };
}
function CreateFilterDeleteCssRuleNode(cssRuleNodeDeleteFilter) {
    return (cssNode) => {
        if (cssNode.typeCssNode().Type == CssNodeType_1.default.Rule().Type) {
            return cssRuleNodeDeleteFilter(cssNode);
        }
        else {
            return false;
        }
    };
}
function FilterDeleteCssRuleNodeByObject(rulesDelete) {
    return CreateFilterDeleteCssRuleNode((cssNode) => {
        let cssNodeRule = cssNode.rule.trim();
        let cssNodeValue = cssNode.value.trim();
        for (let k in rulesDelete) {
            let v = rulesDelete[k];
            let match = false;
            if (v == null || typeof v == 'string') {
                let kMatch = false;
                let vMatch = false;
                if (k == cssNodeRule) {
                    kMatch = true;
                }
                else if (k.endsWith('*') && cssNodeRule.startsWith(k.substring(0, k.length - 1))) {
                    kMatch = true;
                }
                else if (k.startsWith('*') && cssNodeRule.endsWith(k.substring(1))) {
                    kMatch = true;
                }
                if (v == null) {
                    vMatch = true;
                }
                else if (v == cssNodeValue) {
                    vMatch = true;
                }
                else if (v.endsWith('*') && cssNodeValue.startsWith(v.substring(0, v.length - 1))) {
                    vMatch = true;
                }
                else if (v.startsWith('*') && cssNodeValue.endsWith(v.substring(1))) {
                    vMatch = true;
                }
                if (kMatch == true && vMatch == true) {
                    return true;
                }
            }
            if (match) {
                return true;
            }
        }
        return false;
    });
}
const Offset = '    ';
function GenOffset(str = null, rep = 1) {
    if (str == null) {
        str = Offset;
    }
    let x = '';
    for (let i = 0; i < rep; i++) {
        x += str;
    }
    return x;
}
const CssUtil = {
    ParseCssString,
    CreateFilterDeleteCssTypeNode,
    CreateFilterDeleteCssRuleNode,
    GenOffset,
    FilterDeleteCssRuleNodeByObject
};
exports.default = CssUtil;
//# sourceMappingURL=CssUtil.js.map