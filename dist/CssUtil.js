"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BufforText_1 = require("./BufforText");
const CssNode_1 = require("./CssNode/CssNode");
const MediaBlockCssNode_1 = require("./CssNode/MediaBlockCssNode");
const SelectorBlockCssNode_1 = require("./CssNode/SelectorBlockCssNode");
const ImportCssNode_1 = require("./CssNode/ImportCssNode");
const MultiLineCommentCssNode_1 = require("./CssNode/MultiLineCommentCssNode");
const OneLineCommentCssNode_1 = require("./CssNode/OneLineCommentCssNode");
const UndefinedCssNode_1 = require("./CssNode/UndefinedCssNode");
function CompareCss(cssA, cssB) {
    const prepare = (v) => {
        return v.replaceAll(' ', '').replaceAll('\n', '').replaceAll('\r', '');
    };
    const hashCode = function (str) {
        return str.split("").reduce(function (a, b) {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
    };
    let a = prepare(cssA);
    let b = prepare(cssB);
    if (a == b) {
        let ok = (hashCode(a) == hashCode(b));
        if (ok) {
            return true;
        }
    }
    console.log({ cssA, cssB });
    return false;
}
function ParseCssStringSplitToSmallChunks(cssString, enabledCheck = true) {
    let StatusParsing;
    (function (StatusParsing) {
        StatusParsing[StatusParsing["Defalut"] = 0] = "Defalut";
        StatusParsing[StatusParsing["OneLineComment"] = 1] = "OneLineComment";
        StatusParsing[StatusParsing["MultilineComment"] = 2] = "MultilineComment";
        StatusParsing[StatusParsing["Block"] = 3] = "Block";
        StatusParsing[StatusParsing["BlockMultilineComment"] = 4] = "BlockMultilineComment";
        StatusParsing[StatusParsing["StringDoubleQuote"] = 5] = "StringDoubleQuote";
        StatusParsing[StatusParsing["StringSingleQuote"] = 6] = "StringSingleQuote";
    })(StatusParsing || (StatusParsing = {}));
    let statusParsing = StatusParsing.Defalut;
    let currentIndex = 0;
    let currentText = new BufforText_1.BufforText();
    let currentLine = '';
    let blockDepth = '';
    let parsedData = [];
    while (currentIndex < cssString.length) {
        switch (statusParsing) {
            case StatusParsing.Defalut:
                currentText.Text += cssString[currentIndex];
                // console.log('#'+currentText.Text+'#');
                if (cssString[currentIndex] == '"') {
                    statusParsing = StatusParsing.StringDoubleQuote;
                }
                // else if(cssString[currentIndex] == "'") {
                //     statusParsing = StatusParsing.StringSingleQuote;
                // }
                else if (currentText.Text.trimStart().startsWith('//')) {
                    statusParsing = StatusParsing.OneLineComment;
                }
                else if (currentText.Text.trimStart().startsWith('/*')) {
                    statusParsing = StatusParsing.MultilineComment;
                }
                else if (cssString[currentIndex] == '{') {
                    statusParsing = StatusParsing.Block;
                    blockDepth = blockDepth + '{';
                }
                else if (cssString[currentIndex] == '\n') {
                    // When achived endline character
                    let lastLine1 = currentText.LastLine(1).trim();
                    let regExImportRule = /^@import[^;]{1,};$/;
                    let regCssVariableRule = /^--[^:]{1,}:\s{0,}/;
                    let regCssRule = /^[A-Za-z][^:]{1,}:\s{0,}/;
                    let oneLineRule = false;
                    if (regExImportRule.test(lastLine1)) {
                        oneLineRule = true;
                    }
                    else if (regCssVariableRule.test(lastLine1) && lastLine1.endsWith(';')) {
                        oneLineRule = true;
                    }
                    else if (regCssRule.test(lastLine1) && lastLine1.endsWith(';')) {
                        oneLineRule = true;
                    }
                    if (oneLineRule) {
                        parsedData.push(lastLine1);
                        currentText.RemoveLastLine(1);
                    }
                }
                else if (/^[A-Za-z]{1,}/.test(currentText.Text.trim()) && currentText.Text.trim().endsWith(';')) {
                    parsedData.push(currentText.Text);
                    currentText.Text = '';
                }
                break;
            case StatusParsing.Block:
                currentText.Text += cssString[currentIndex];
                if (currentText.Text.endsWith('/*')) {
                    statusParsing = StatusParsing.BlockMultilineComment;
                    break;
                }
                else if (cssString[currentIndex] == '{') {
                    blockDepth = blockDepth + '{';
                }
                else if (cssString[currentIndex] == '(') {
                    blockDepth = blockDepth + '(';
                }
                else if (cssString[currentIndex] == '}') {
                    blockDepth = blockDepth.substring(0, blockDepth.length - 1);
                }
                else if (cssString[currentIndex] == ')') {
                    blockDepth = blockDepth.substring(0, blockDepth.length - 1);
                }
                if (blockDepth == '') {
                    parsedData.push(currentText.Text);
                    currentText.Text = '';
                    statusParsing = StatusParsing.Defalut;
                }
                break;
            case StatusParsing.OneLineComment:
                currentText.Text += cssString[currentIndex];
                if (cssString[currentIndex] == '\r') {
                    currentIndex++;
                    currentText.Text += cssString[currentIndex];
                }
                if (currentText.Text.endsWith('\n')) {
                    parsedData.push(currentText.Text);
                    currentText.Text = '';
                    statusParsing = StatusParsing.Defalut;
                }
                break;
            case StatusParsing.MultilineComment:
                currentText.Text += cssString[currentIndex];
                if (currentText.Text.endsWith('*/')) {
                    parsedData.push(currentText.Text);
                    statusParsing = StatusParsing.Defalut;
                    currentText.Text = '';
                }
                break;
            case StatusParsing.BlockMultilineComment:
                currentText.Text += cssString[currentIndex];
                if (currentText.Text.endsWith('*/')) {
                    statusParsing = StatusParsing.Block;
                }
                break;
            case StatusParsing.StringDoubleQuote:
                currentText.Text += cssString[currentIndex];
                if (cssString[currentIndex] == "\\") {
                    currentIndex++;
                    if (cssString[currentIndex] == '"') {
                        currentText.Text += cssString[currentIndex];
                    }
                }
                else if (cssString[currentIndex] == '"') {
                    statusParsing = StatusParsing.Defalut;
                }
                break;
            // case StatusParsing.StringSingleQuote: 
            //     currentText.Text += cssString[currentIndex];
            //     if(cssString[currentIndex] == "\\") {
            //         currentIndex++;
            //         if(cssString[currentIndex] == "'") {
            //             currentText.Text += cssString[currentIndex];
            //         }
            //     }
            //     else if(cssString[currentIndex] == "'") {
            //         statusParsing = StatusParsing.Defalut;
            //     }
            //     break;
            default:
                console.log('statusParsing is not implemnented for: ' + statusParsing);
        }
        currentIndex++;
    }
    if (!CompareCss(parsedData.join('\n'), cssString) && enabledCheck) {
        throw new Error('Failed to parse SCSS/CSS string');
    }
    return parsedData;
}
function ParseCssSmallChunksToJson(smallChunks) {
    let data = [];
    smallChunks.forEach(chunk => {
        if (chunk.trim().startsWith('/*')) {
            let i = new MultiLineCommentCssNode_1.MultiLineCommentCssNode(chunk);
            data.push(i);
        }
        else if (chunk.trim().startsWith('//')) {
            let i = new OneLineCommentCssNode_1.OneLineCommentCssNode(chunk);
            data.push(i);
        }
        else if (chunk.trim().startsWith('@import')) {
            let i = new ImportCssNode_1.ImportCssNode(chunk);
            data.push(i);
        }
        //Block with selector
        else if ((/^(>)?(#|\.|\:)?[A-Za-z][A-Za-z0-9 >=,\*#_+\:\.\-\(\)\[\]\"]{1,}\s{0,}\{/
            .test(chunk.trim().replaceAll('\r', '').replaceAll('\n', ''))
            ||
                /^&[A-Za-z0-9 >=,\*#_+\:\.\-\(\)\[\]\"]{1,}\s{0,}\{/
                    .test(chunk.trim().replaceAll('\r', '').replaceAll('\n', ''))
            ||
                /^\*([A-Za-z0-9 >=,\*#_+\:\.\-\(\)\[\]\"]{1,})?\s{0,}\{/
                    .test(chunk.trim().replaceAll('\r', '').replaceAll('\n', '')))
            &&
                chunk.trim().endsWith('}')) {
            let i = new SelectorBlockCssNode_1.SelectorBlockCssNode(chunk);
            data.push(i);
        }
        //Block width media query
        else if ((/^@media\s{0,}(\([a-z\-]{1,}:\s{0,}\d{1,}[a-z]{1,}\)(?:\s{1,}[a-z]{1,}\s{1,})?){1,}\s{0,}\{/
            .test(chunk.trim().replaceAll('\r', '').replaceAll('\n', ''))
            ||
                chunk.trim().startsWith('@-moz-document url-prefix()'))
            &&
                chunk.trim().endsWith('}')) {
            let i = new MediaBlockCssNode_1.MediaBlockCssNode(chunk);
            data.push(i);
        }
        else if ((/^[A-Za-z][^:]{1,}:\s{0,}/.test(chunk.trim()))
            &&
                chunk.trim().endsWith(';')) {
            let i = new CssNode_1.RuleCssNode(chunk);
            data.push(i);
        }
        else if ((/^--[A-Za-z][^:]{1,}:\s{0,}/.test(chunk.trim()))
            &&
                chunk.trim().endsWith(';')) {
            let i = new CssNode_1.CssVariableCssNode(chunk);
            data.push(i);
        }
        else {
            let i = new UndefinedCssNode_1.UndefinedCssNode(chunk);
            data.push(i);
        }
    });
    let dataJson = data.map((v) => { return v.toJson(); });
    return { 'child': dataJson };
}
function CssToJson(cssString) {
    let cssStringChunks = CssUtil.ParseCssStringSplitToSmallChunks(cssString);
    let json = CssUtil.ParseCssSmallChunksToJson(cssStringChunks);
    return json;
}
function JsonToCss(j, depth = 0) {
    let css = '';
    let child = j['child'];
    for (let childIndex = 0; childIndex < child.length; childIndex++) {
        if (typeof (child[childIndex]) == typeof (' ')) {
            css += child[childIndex];
            continue;
        }
        let currentChild = child[childIndex];
        switch (currentChild.type) {
            case CssNode_1.CssNodeType.SelectorBlockCssNode:
            case CssNode_1.CssNodeType.MediaBlock:
                {
                    let code = currentChild.name + '{\n';
                    if (currentChild.bodyJson != null) {
                        code += JsonToCss({ 'child': currentChild.bodyJson }, depth + 1);
                    }
                    else {
                        code += currentChild.body + '\n';
                    }
                    code += '}';
                    css += code + "\n";
                }
                break;
            case CssNode_1.CssNodeType.Import:
            case CssNode_1.CssNodeType.MultiLineComment:
            case CssNode_1.CssNodeType.OneLineComment:
                {
                    let code = '' + currentChild.raw;
                    css += code.trim() + "\n";
                }
                break;
            case CssNode_1.CssNodeType.CssVariable:
            case CssNode_1.CssNodeType.Rule:
                {
                    let code = '' + currentChild.name + ": " + currentChild.body + ";";
                    css += code.trim() + "\n";
                }
                break;
            default:
                console.log("type not implemented: " + currentChild.type);
                console.log(currentChild);
        }
    }
    return css;
}
const CssUtil = {
    ParseCssStringSplitToSmallChunks,
    ParseCssSmallChunksToJson,
    CssToJson,
    JsonToCss,
    CompareCss
};
exports.default = CssUtil;
//# sourceMappingURL=CssUtil.js.map