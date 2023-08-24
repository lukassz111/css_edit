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
const CssUtil_1 = __importDefault(require("./CssUtil"));
const CssNode_1 = require("./CssNode/CssNode");
class Main {
    static ProgramRemoveComments(fileInput, fileOutput) {
        let cssStringInput = fs.readFileSync(fileInput, 'utf-8').toString();
        let cssStringChunks = CssUtil_1.default.ParseCssStringSplitToSmallChunks(cssStringInput);
        let json = CssUtil_1.default.ParseCssSmallChunksToJson(cssStringChunks);
        const process = function (childs) {
            let newChilds = [];
            for (let i = 0; i < childs.length; i++) {
                let currentChild = childs[i];
                switch (currentChild.type) {
                    case CssNode_1.CssNodeType.OneLineComment:
                    case CssNode_1.CssNodeType.MultiLineComment:
                        break;
                    case CssNode_1.CssNodeType.SelectorBlockCssNode:
                    case CssNode_1.CssNodeType.MediaBlock:
                        if (currentChild.bodyJson !== undefined) {
                            let newChild = currentChild;
                            newChild.bodyJson = process(currentChild.bodyJson);
                            newChilds.push(newChild);
                        }
                        break;
                    default:
                        newChilds.push(currentChild);
                }
            }
            return newChilds;
        };
        json.child = process(json.child);
        let cssStringOutput = CssUtil_1.default.JsonToCss(json);
        fs.writeFileSync(fileOutput, cssStringOutput, { encoding: 'utf-8' });
    }
    static ProgramRemoveEmptyBlocks(fileInput, fileOutput) {
        let cssStringInput = fs.readFileSync(fileInput, 'utf-8').toString();
        let cssStringChunks = CssUtil_1.default.ParseCssStringSplitToSmallChunks(cssStringInput);
        let json = CssUtil_1.default.ParseCssSmallChunksToJson(cssStringChunks);
        const process = function (childs) {
            let newChilds = [];
            for (let i = 0; i < childs.length; i++) {
                let currentChild = childs[i];
                switch (currentChild.type) {
                    case CssNode_1.CssNodeType.SelectorBlockCssNode:
                    case CssNode_1.CssNodeType.MediaBlock:
                        if (currentChild.bodyJson !== undefined) {
                            let newChild = currentChild;
                            if (newChild.bodyJson.length > 0) {
                                newChild.bodyJson = process(newChild.bodyJson);
                                newChilds.push(newChild);
                            }
                        }
                        else {
                            newChilds.push(currentChild);
                        }
                        break;
                    default:
                        newChilds.push(currentChild);
                }
            }
            return newChilds;
        };
        json.child = process(json.child);
        let cssStringOutput = CssUtil_1.default.JsonToCss(json);
        fs.writeFileSync(fileOutput, cssStringOutput, { encoding: 'utf-8' });
    }
    constructor() { }
    static ProgramRemoveRules(fileInput, fileOutput, removeRules) {
        let removeRulesJson = JSON.parse(fs.readFileSync(removeRules, 'utf-8').toString());
        let cssString = fs.readFileSync(fileInput, 'utf-8').toString();
        let cssStringChunks = CssUtil_1.default.ParseCssStringSplitToSmallChunks(cssString);
        let json = CssUtil_1.default.ParseCssSmallChunksToJson(cssStringChunks);
        const process = function (childs) {
            let newChilds = [];
            for (let i = 0; i < childs.length; i++) {
                let currentChild = childs[i];
                switch (currentChild.type) {
                    case CssNode_1.CssNodeType.Rule:
                        {
                            let push = true;
                            for (let ruleKey in removeRulesJson) {
                                let ruleRegEx = null;
                                if (ruleKey.startsWith('*') && ruleKey.endsWith('*')) {
                                    ruleRegEx = new RegExp(ruleKey.substring(0, ruleKey.length - 1).substring(1));
                                }
                                else if (ruleKey.startsWith('*')) {
                                    ruleRegEx = new RegExp(ruleKey.substring(1) + "$");
                                }
                                else if (ruleKey.endsWith('*')) {
                                    ruleRegEx = new RegExp('^' + ruleKey.substring(0, ruleKey.length - 1));
                                }
                                else {
                                    ruleRegEx = new RegExp('^' + ruleKey + "$");
                                }
                                if (ruleRegEx != null) {
                                    if (ruleRegEx.test((currentChild.name + '').trim())) {
                                        if (removeRulesJson[ruleKey] == null) {
                                            push = false;
                                        }
                                        else {
                                            let ruleValue = removeRulesJson[ruleKey];
                                            let ruleValueRegEx = null;
                                            if (ruleValue.startsWith('*') && ruleValue.endsWith('*')) {
                                                ruleValueRegEx = new RegExp(ruleValue.substring(0, ruleValue.length - 1).substring(1));
                                            }
                                            else if (ruleValue.startsWith('*')) {
                                                ruleValueRegEx = new RegExp(ruleValue.substring(1) + "$");
                                            }
                                            else if (ruleValue.endsWith('*')) {
                                                ruleValueRegEx = new RegExp('^' + ruleValue.substring(0, ruleValue.length - 1));
                                            }
                                            else {
                                                ruleValueRegEx = new RegExp('^' + ruleValue + "$");
                                            }
                                            if (ruleValueRegEx != null) {
                                                if (ruleValueRegEx.test((currentChild.body + '').trim())) {
                                                    push = false;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (!push) {
                                    break;
                                }
                            }
                            if (push) {
                                newChilds.push(currentChild);
                            }
                        }
                        break;
                    case CssNode_1.CssNodeType.SelectorBlockCssNode:
                    case CssNode_1.CssNodeType.MediaBlock:
                        if (currentChild.bodyJson !== undefined) {
                            let newChild = currentChild;
                            newChild.bodyJson = process(currentChild.bodyJson);
                            newChilds.push(newChild);
                        }
                        break;
                    default:
                        newChilds.push(currentChild);
                }
            }
            return newChilds;
        };
        json.child = process(json.child);
        let cssStringOutput = CssUtil_1.default.JsonToCss(json);
        fs.writeFileSync(fileOutput, cssStringOutput, { encoding: 'utf-8' });
    }
    static ProgramToJson(fileInput, fileOutput) {
        let cssString = fs.readFileSync(fileInput, 'utf-8').toString();
        let cssStringChunks = CssUtil_1.default.ParseCssStringSplitToSmallChunks(cssString);
        let json = CssUtil_1.default.ParseCssSmallChunksToJson(cssStringChunks);
        fs.writeFileSync(fileOutput, JSON.stringify(json), { encoding: 'utf-8' });
    }
    static ProgramFromJson(fileInput, fileOutput) {
        let json = JSON.parse(fs.readFileSync(fileInput, 'utf-8').toString());
        let cssString = CssUtil_1.default.JsonToCss(json);
        console.log("fromJson: " + fileInput + " " + fileOutput);
        fs.writeFileSync(fileOutput, cssString, { encoding: 'utf-8' });
    }
    static ProgramToJsonFromJson(fileInput, fileOutput) {
        let cssStringInput = fs.readFileSync(fileInput, 'utf-8').toString();
        let cssStringChunks = CssUtil_1.default.ParseCssStringSplitToSmallChunks(cssStringInput);
        let json = CssUtil_1.default.ParseCssSmallChunksToJson(cssStringChunks);
        let cssStringOutput = CssUtil_1.default.JsonToCss(json);
        fs.writeFileSync(fileOutput, cssStringOutput, { encoding: 'utf-8' });
    }
}
exports.Main = Main;
//# sourceMappingURL=Main.js.map