import { CssBlockNode } from "./CssBlockNode";
import CssMultilineCommentNode from "./CssMultilineCommentNode";
import { CssNodeDeleteFilter, CssRuleNodeDeleteFilter } from "./CssNodeDeleteFilter";
import CssNodeType from "./CssNodeType";
import { CssOnelineCommentNode } from "./CssOnelineCommentNode";
import { CssRuleNode } from "./CssRuleNode";
import { ICssNode } from "./ICssNode";

function ParseCssString(cssString: string, depth: number = -1): Array<ICssNode> {
    let Childrens: Array<ICssNode> = [];
    let charIndex = 0;
    let inMultilineComment = false;
    let inOneLineComment = false;
    let inBlock = false;
    let content: string = '';
    let defBlockContent: string = '';
    let blockDepthCounter = 0;
    let inBlokcMultilineComment = false;
    while(charIndex < cssString.length) {
        let processString = cssString.substring(charIndex);
        if(!inMultilineComment && processString.startsWith('/*') && !inBlock) {
            inMultilineComment = true;
            content = '';
            charIndex+=2;
        }
        else if(inMultilineComment) {
            if(!processString.startsWith('*/')) {
                content += processString[0];
                charIndex ++;
            } else {
                inMultilineComment = false;
                charIndex +=2;
                Childrens.push(new CssMultilineCommentNode(content));
                content = '';
            }
        }
        else if(!inOneLineComment && processString.startsWith('//') && !inBlock) {
            inOneLineComment = true;
            content = '';
            charIndex+=2;
        }
        else if(inOneLineComment) {
            if(processString.startsWith('\n')) {
                inOneLineComment = false;
                charIndex++;
                Childrens.push(new CssOnelineCommentNode(content));
                content = '';
            } else {
                content += processString[0];
                charIndex ++;
            }
        }
        else if(!inBlock && !inMultilineComment && !inOneLineComment) {
            if(!processString.startsWith('{')) {
                if(processString.startsWith(';')) {
                    content = content.trim();
                    Childrens.push(new CssRuleNode(content));
                    content = '';
                    charIndex ++;
                } else if(processString.length == 1) {
                    content += processString[0];
                    content = content.trim();
                    Childrens.push(new CssRuleNode(content));
                    content = '';
                    charIndex ++;
                } 
                else {
                    content += processString[0];
                    charIndex ++;
                }
            }
            else {
                defBlockContent = content;
                content = '';
                charIndex ++;
                inBlock = true;
                blockDepthCounter = 0;
            }
        }
        else if(inBlock && !inMultilineComment && !inOneLineComment) {
            if(processString.startsWith('/*') && !inBlokcMultilineComment) {
                content += '/*';
                charIndex +=2;
                inBlokcMultilineComment = true;
            } else if(processString.startsWith('*/') && inBlokcMultilineComment) {
                content += '*/';
                charIndex +=2;
                inBlokcMultilineComment = false;
            }
            else if(processString.startsWith('{') && !inBlokcMultilineComment) {
                content += processString[0];
                charIndex++;
                blockDepthCounter++;
            }
            else if(processString.startsWith('}') && !inBlokcMultilineComment) {
                if(blockDepthCounter == 0) {
                    inBlock = false;
                    charIndex ++;
                    content = content.trim();
                    defBlockContent = defBlockContent.trim();
                    Childrens.push(CssBlockNode.CreateFromContentString(defBlockContent,content,depth+1));
                    
                    content = '';
                    defBlockContent = '';
                    
                } else {
                    content += processString[0];
                    charIndex++;
                    blockDepthCounter--;
                }
            } else {
                content += processString[0];
                charIndex++;
            }
        }
        else {
            charIndex ++;
        }
    }
    return Childrens;
}



function CreateFilterDeleteCssTypeNode(cssTypeNode: Array<CssNodeType>): CssNodeDeleteFilter {
    return (cssNode: ICssNode) => {
        let d: boolean = false;
        for(let i = 0; i < cssTypeNode.length; i++) {
            if(cssTypeNode[i].Type == cssNode.typeCssNode().Type) {
                d = true;
                break;
            }
        }
        return d;
    }
}

function CreateFilterDeleteCssRuleNode(cssRuleNodeDeleteFilter: CssRuleNodeDeleteFilter): CssNodeDeleteFilter {
    return (cssNode: ICssNode) => {
        if(cssNode.typeCssNode().Type == CssNodeType.Rule().Type) {
            return cssRuleNodeDeleteFilter(cssNode as CssRuleNode)
        } else {
            return false;
        }
    }
}

function FilterDeleteCssRuleNodeByObject(rulesDelete: any) {
    return CreateFilterDeleteCssRuleNode( (cssNode: CssRuleNode) => {
        let cssNodeRule = cssNode.rule.trim();
        let cssNodeValue = cssNode.value.trim();
        for(let k in rulesDelete) {
            let v = rulesDelete[k];
            let match = false;
            if(v == null || typeof v == 'string') {

                let kMatch = false;
                let vMatch = false;
                
                if(k == cssNodeRule) {
                    kMatch = true;
                } else if(k.endsWith('*') && cssNodeRule.startsWith(k.substring(0,k.length-1))) {
                    kMatch = true;
                } else if(k.startsWith('*') && cssNodeRule.endsWith(k.substring(1))) {
                    kMatch = true;
                }

                if(v == null) {
                    vMatch = true;
                } else if(v == cssNodeValue) {
                    vMatch = true;
                    
                } else if(v.endsWith('*') && cssNodeValue.startsWith(v.substring(0, v.length -1))) {
                    vMatch = true;
                } else if(v.startsWith('*') && cssNodeValue.endsWith(v.substring(1))) {
                    vMatch = true;
                }

                if(kMatch == true && vMatch == true) {
                    return true;
                }

            }
            if(match) {
                return true;
            }
        }
        return false;
    })
}


const Offset: string = '    ';
function GenOffset(str: string|null = null, rep: number = 1) {
    if(str == null) {
        str = Offset;
    }
    let x = '';
    for(let i = 0; i < rep; i++) {
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
export default CssUtil;