import { BufforText } from "./BufforText";
import { CssNode, RuleCssNode } from "./CssNode/CssNode";
import { MediaBlockCssNode } from "./CssNode/MediaBlockCssNode";
import { SelectorBlockCssNode } from "./CssNode/SelectorBlockCssNode";
import { ImportCssNode } from "./CssNode/ImportCssNode";
import { MultiLineCommentCssNode } from "./CssNode/MultiLineCommentCssNode";
import { OneLineCommentCssNode } from "./CssNode/OneLineCommentCssNode";
import { UndefinedCssNode } from "./CssNode/UndefinedCssNode";
function CompareCss(cssA: string, cssB: string): boolean {
    const prepare = (v: string):string => { 
        return v.replaceAll(' ','').replaceAll('\n','').replaceAll('\r','');
    }
    const hashCode = function(str: string) {
        return str.split("").reduce(function(a, b) {
          a = ((a << 5) - a) + b.charCodeAt(0);
          return a & a;
        }, 0);
      }
    let a = prepare(cssA);
    let b = prepare(cssB);
    if(a == b) {
        let ok = (hashCode(a) == hashCode(b));
        if(ok) {
            return true;
        }
    }
    console.log({cssA,cssB});
    return false;
}
function ParseCssStringSplitToSmallChunks(cssString: string, enabledCheck: boolean = true): string[] {
    enum StatusParsing {
        Defalut,
        OneLineComment,
        MultilineComment,
        Block,
        BlockMultilineComment,
        StringDoubleQuote,
        StringSingleQuote
    }
    let statusParsing: StatusParsing = StatusParsing.Defalut;
    let currentIndex = 0;
    let currentText = new BufforText();
    let currentLine = '';
    let blockDepth = '';
    let parsedData = [];
    while(currentIndex < cssString.length) {
        switch(statusParsing) {
            case StatusParsing.Defalut:
                currentText.Text += cssString[currentIndex];
                // console.log('#'+currentText.Text+'#');
                if(cssString[currentIndex] == '"') {
                    statusParsing = StatusParsing.StringDoubleQuote;
                } 
                // else if(cssString[currentIndex] == "'") {
                //     statusParsing = StatusParsing.StringSingleQuote;
                // }
                else if(currentText.Text.trimStart().startsWith('//')) {
                    statusParsing = StatusParsing.OneLineComment;
                }
                else if(currentText.Text.trimStart().startsWith('/*')) {
                    statusParsing = StatusParsing.MultilineComment;
                }
                else if(cssString[currentIndex] == '{') {
                    statusParsing = StatusParsing.Block;
                    blockDepth = blockDepth+'{';
                }
                else if(cssString[currentIndex] == '\n') {
                    // When achived endline character
                    let lastLine1 = currentText.LastLine(1).trim();
                    
                    let regExImportRule = /^@import[^;]{1,};$/;
                    let regCssVariableRule = /^--[^:]{1,}:\s{0,}/;
                    let regCssRule = /^[A-Za-z][^:]{1,}:\s{0,}/;
                    let oneLineRule = false;
                    if(regExImportRule.test(lastLine1)) {
                        oneLineRule = true;
                    }
                    else if(regCssVariableRule.test(lastLine1) && lastLine1.endsWith(';')) {
                        oneLineRule = true
                    }
                    else if(regCssRule.test(lastLine1) && lastLine1.endsWith(';')) {
                        oneLineRule = true
                    }
                    if(oneLineRule) {
                        parsedData.push(lastLine1);
                        currentText.RemoveLastLine(1);
                    }
                }
                else if(/^[A-Za-z]{1,}/.test(currentText.Text.trim()) && currentText.Text.trim().endsWith(';')) {
                    parsedData.push(currentText.Text);
                    currentText.Text = '';
                }
                break;
            case StatusParsing.Block:
                currentText.Text += cssString[currentIndex];
                if(currentText.Text.endsWith('/*')) {
                    statusParsing = StatusParsing.BlockMultilineComment;
                    break;
                }
                else if(cssString[currentIndex] == '{') {
                    blockDepth = blockDepth+'{';
                } else if(cssString[currentIndex] == '(') {
                    blockDepth = blockDepth+'(';
                } else if(cssString[currentIndex] == '}') {
                    blockDepth = blockDepth.substring(0,blockDepth.length-1);
                } else if(cssString[currentIndex] == ')') {
                    blockDepth = blockDepth.substring(0,blockDepth.length-1);
                }
                if(blockDepth == '') {
                    parsedData.push(currentText.Text);
                    currentText.Text = '';
                    statusParsing = StatusParsing.Defalut;
                }
                break;
            case StatusParsing.OneLineComment:
                currentText.Text += cssString[currentIndex];
                if(cssString[currentIndex] == '\r') {
                    currentIndex++;
                    currentText.Text += cssString[currentIndex];
                }
                if(currentText.Text.endsWith('\n')) {
                    parsedData.push(currentText.Text);
                    currentText.Text = '';
                    statusParsing = StatusParsing.Defalut;
                }
                break;
            case StatusParsing.MultilineComment:
                currentText.Text += cssString[currentIndex];
                if(currentText.Text.endsWith('*/')) {
                    parsedData.push(currentText.Text);
                    statusParsing = StatusParsing.Defalut;
                    currentText.Text = ''
                }
                break;
            case StatusParsing.BlockMultilineComment:
                currentText.Text += cssString[currentIndex];
                if(currentText.Text.endsWith('*/')) {
                    statusParsing = StatusParsing.Block;
                }
                break;
            case StatusParsing.StringDoubleQuote: 
                currentText.Text += cssString[currentIndex];
                if(cssString[currentIndex] == "\\") {
                    currentIndex++;
                    if(cssString[currentIndex] == '"') {
                        currentText.Text += cssString[currentIndex];
                    }
                }
                else if(cssString[currentIndex] == '"') {
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
                console.log('statusParsing is not implemnented for: '+statusParsing);
        }
        currentIndex++;
    }
    if(!CompareCss(parsedData.join('\n'),cssString) && enabledCheck) {
        throw new Error('Failed to parse SCSS/CSS string');
    }
    return parsedData;
}
function ParseCssSmallChunksToJson(smallChunks: string[]): any {
    let data: CssNode[] = [];
    smallChunks.forEach(chunk=>{
        if(chunk.trim().startsWith('/*')) {
            let i = new MultiLineCommentCssNode(chunk);
            data.push(i);
        }
        else if(chunk.trim().startsWith('//')) {
            let i = new OneLineCommentCssNode(chunk);
            data.push(i);
        }
        else if(chunk.trim().startsWith('@import')) {
            let i = new ImportCssNode(chunk);
            data.push(i);
        }
        //Block with selector
        else if(
            (
                /^(#|\.|\:)?[A-Za-z][A-Za-z0-9 >,\*#_+\:\.\-\(\)]{1,}\s{0,}\{/
                .test(
                    chunk.trim().replaceAll('\r','').replaceAll('\n','')
                )
                ||
                /^\*([A-Za-z0-9 >,\*#_+\:\.\-\(\)]{1,})?\s{0,}\{/
                .test(
                    chunk.trim().replaceAll('\r','').replaceAll('\n','')
                )
            )
            &&
            chunk.trim().endsWith('}')
            ) {
            let i = new SelectorBlockCssNode(chunk);
            data.push(i);
        }
        //Block width media query
        else if(
            (
                /^@media\s{0,}(\([a-z\-]{1,}:\s{0,}\d{1,}[a-z]{1,}\)(?:\s{1,}[a-z]{1,}\s{1,})?){1,}\s{0,}\{/
                .test(
                    chunk.trim().replaceAll('\r','').replaceAll('\n','')
                )
                ||
                chunk.trim().startsWith('@-moz-document url-prefix()')
            )
            &&
            chunk.trim().endsWith('}')
        ) {
            let i = new MediaBlockCssNode(chunk);
            data.push(i);
        }
        else if(
            (
                /^[A-Za-z][^:]{1,}:\s{0,}/.test(chunk.trim())
            )
            &&
            chunk.trim().endsWith(';')
        ) {
            let i = new RuleCssNode(chunk);
            data.push(i);
        }
        else {
            let i = new UndefinedCssNode(chunk);
            data.push(i);
        }
    });
    let dataJson = data.map((v) => {return v.toJson()});
    return { 'child': dataJson };
}
function CssToJson(cssString: string): any {
    let cssStringChunks = CssUtil.ParseCssStringSplitToSmallChunks(cssString);
    let json = CssUtil.ParseCssSmallChunksToJson(cssStringChunks);
    return json;
}

const CssUtil = {
    ParseCssStringSplitToSmallChunks,
    ParseCssSmallChunksToJson,
    CssToJson,
    CompareCss
};
export default CssUtil;