"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const fs = __importStar(require("fs"));
const CssNodeType_1 = __importDefault(require("./CssNodeType"));
const CssRootNode_1 = require("./CssRootNode");
const CssUtil_1 = __importDefault(require("./CssUtil"));
class Main {
    constructor() { }
    static ProgramRemoveCommentsAndRules(fileInput, fileOutput, rulesDeleteFile) {
        let cssString = fs.readFileSync(fileInput, 'utf-8').toString();
        let rootNode = new CssRootNode_1.CssRootNode();
        rootNode.addCssString(cssString);
        rootNode.deleteChildrenRecursive(CssUtil_1.default.CreateFilterDeleteCssTypeNode([CssNodeType_1.default.OnelineComment(), CssNodeType_1.default.MultilineComment()]));
        let rulesDelete = JSON.parse(fs.readFileSync(rulesDeleteFile, 'utf-8').toString());
        rootNode.deleteChildrenRecursive(CssUtil_1.default.FilterDeleteCssRuleNodeByObject(rulesDelete));
        rootNode.deleteEmptyNodes();
        // (v.rule.startsWith('background-') && v.rule != 'background-image') ||
        // (v.rule.startsWith('border-') && v.rule != 'border-color') ||
        fs.writeFileSync(fileOutput, rootNode.toCode(), { encoding: 'utf-8' });
    }
    static Program(fileInput, fileOutput) {
        let cssString = fs.readFileSync(fileInput, 'utf-8').toString();
        let rootNode = new CssRootNode_1.CssRootNode();
        rootNode.addCssString(cssString);
        let deletedComments = rootNode.deleteChildrenRecursive(CssUtil_1.default.CreateFilterDeleteCssTypeNode([CssNodeType_1.default.MultilineComment(), CssNodeType_1.default.OnelineComment()]));
        console.log({ deletedComments });
        let deleteRules = (v) => {
            if (v.rule.startsWith('margin') ||
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
                (v.rule == 'text-decoration' && v.value.trim() == 'none')) {
                return true;
            }
            return false;
        };
        // let deletedRules = rootNode.deleteChildrenRecursive(CssUtil.CreateFilterDeleteCssRuleNode(deleteRules));
        // console.log({deletedRules});
        // rootNode.deleteEmptyNodes();
        fs.writeFileSync(fileOutput, rootNode.toCode(), { encoding: 'utf-8' });
    }
}
exports.Main = Main;
//# sourceMappingURL=Main.js.map