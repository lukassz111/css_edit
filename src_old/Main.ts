import * as fs from 'fs';
import { ICssNode } from './ICssNode';
import { ICssNodeWithChildren } from './ICssNodeWithChildren';
import CssNodeType from './CssNodeType';
import { CssRootNode } from './CssRootNode';
import CssUtil from './CssUtil';
import { CssRuleNodeDeleteFilter } from './CssNodeDeleteFilter';
export class Main {
    private constructor(){}

    public static ProgramRemoveCommentsAndRules(fileInput: string, fileOutput: string, rulesDeleteFile: string) {
        let cssString = fs.readFileSync(fileInput,'utf-8').toString();
        let rootNode = new CssRootNode();
        rootNode.addCssString(cssString);
        rootNode.deleteChildrenRecursive(CssUtil.CreateFilterDeleteCssTypeNode([CssNodeType.OnelineComment(),CssNodeType.MultilineComment()]));
        let rulesDelete = JSON.parse(fs.readFileSync(rulesDeleteFile,'utf-8').toString());
        rootNode.deleteChildrenRecursive(CssUtil.FilterDeleteCssRuleNodeByObject(rulesDelete));
        rootNode.deleteEmptyNodes();
        
// (v.rule.startsWith('background-') && v.rule != 'background-image') ||
// (v.rule.startsWith('border-') && v.rule != 'border-color') ||
        
        fs.writeFileSync(fileOutput,rootNode.toCode(),{encoding: 'utf-8'});
    }
    public static Program(fileInput: string, fileOutput: string) {
        let cssString = fs.readFileSync(fileInput,'utf-8').toString();
        let rootNode = new CssRootNode();
        rootNode.addCssString(cssString);
        let deletedComments = rootNode.deleteChildrenRecursive(CssUtil.CreateFilterDeleteCssTypeNode([CssNodeType.MultilineComment(), CssNodeType.OnelineComment()]));
        console.log({deletedComments});
        let deleteRules: CssRuleNodeDeleteFilter = (v) => {
            if(
                v.rule.startsWith('margin') || 
                v.rule.startsWith('--var-') ||
                v.rule.startsWith('--tul_recruitment_text-') ||
                v.rule.startsWith('--tul_recruitment-') ||
                v.rule.startsWith('--tul-recruitment-') ||
                v.rule == '--bs-breadcrumb-divider' ||
                v.rule == 'display' || 
                v.rule == '--id-main-wrapper-width' ||
                v.rule == '--id-main-wrapper-margin' ||
                v.rule == 'transition' || 
                v.rule == 'left' || 
                v.rule == 'right' || 
                v.rule.startsWith('padding') ||
                v.rule == 'width' ||
                v.rule == 'height' ||
                v.rule == 'min-width' ||
                v.rule == 'min-height' ||
                v.rule == 'line-height' ||
                v.rule == 'max-width' ||
                v.rule == 'max-height' ||
                v.rule == 'content' ||
                v.rule == 'text-align' ||
                v.rule == 'text-transform' ||
                v.rule == 'order' ||
                v.rule == 'overflow' ||
                v.rule == 'clip' ||
                v.rule == 'z-index' ||
                v.rule == 'position' ||
                v.rule == 'gap' ||
                v.rule == 'box-sizing' ||
                v.rule == 'float' ||
                v.rule == 'text-underline-offset' ||
                v.rule == 'word-break' ||
                v.rule == 'top' ||
                v.rule == 'cursor' ||
                v.rule == 'bottom' ||
                v.rule == 'opacity' ||
                v.rule == 'letter-spacing' ||
                v.rule.startsWith('flex-') || 
                v.rule.startsWith('grid-') || 
                v.rule == 'font' ||
                v.rule.startsWith('font-') || 
                v.rule.startsWith('justify-') || 
                v.rule.startsWith('align-') || 
                (v.rule.startsWith('background-') && v.rule != 'background-image') ||
                (v.rule.startsWith('border-') && v.rule != 'border-color') ||
                (v.rule == 'border' && v.value.trim() == '0') ||
                (v.rule == 'text-decoration' && v.value.trim() == 'none')
                ) {
                return true;
            }
            return false;
        }
        // let deletedRules = rootNode.deleteChildrenRecursive(CssUtil.CreateFilterDeleteCssRuleNode(deleteRules));
        // console.log({deletedRules});
        // rootNode.deleteEmptyNodes();
        fs.writeFileSync(fileOutput,rootNode.toCode(),{encoding: 'utf-8'});
    }
}