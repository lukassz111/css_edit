import * as fs from 'fs';
import CssUtil from './CssUtil';
import { CssNodeType, ICssNode } from './CssNode/CssNode';
export class Main {
    static ProgramRemoveComments(fileInput: any, fileOutput: any) {
        let cssStringInput = fs.readFileSync(fileInput,'utf-8').toString();
        let cssStringChunks = CssUtil.ParseCssStringSplitToSmallChunks(cssStringInput);
        let json = CssUtil.ParseCssSmallChunksToJson(cssStringChunks);
        const process = function(childs: ICssNode[]): ICssNode[] {
            let newChilds: ICssNode[] = [];
            for(let i = 0; i < childs.length; i++) {
                let currentChild = childs[i];
                switch(currentChild.type) {
                    case CssNodeType.OneLineComment:
                    case CssNodeType.MultiLineComment:
                        break
                    case CssNodeType.SelectorBlockCssNode:
                    case CssNodeType.MediaBlock:
                        if (currentChild.bodyJson !== undefined) {
                            let newChild = currentChild;
                            newChild.bodyJson = process(currentChild.bodyJson);
                            newChilds.push(newChild);
                        }
                        break
                    default:
                        newChilds.push(currentChild);
                }
            }
            return newChilds
        }
        json.child = process(json.child);
        let cssStringOutput = CssUtil.JsonToCss(json);
        fs.writeFileSync(fileOutput,cssStringOutput,{encoding: 'utf-8'});
    }
    static ProgramRemoveEmptyBlocks(fileInput: any, fileOutput: any) {
        let cssStringInput = fs.readFileSync(fileInput,'utf-8').toString();
        let cssStringChunks = CssUtil.ParseCssStringSplitToSmallChunks(cssStringInput);
        let json = CssUtil.ParseCssSmallChunksToJson(cssStringChunks);
        const process = function(childs: ICssNode[]): ICssNode[] {
            let newChilds: ICssNode[] = [];
            for(let i = 0; i < childs.length; i++) {
                let currentChild = childs[i];
                switch(currentChild.type) {
                    case CssNodeType.SelectorBlockCssNode:
                    case CssNodeType.MediaBlock:
                        if (currentChild.bodyJson !== undefined) {
                            let newChild = currentChild;
                            if(newChild.bodyJson.length > 0) {
                                newChild.bodyJson = process(newChild.bodyJson);
                                newChilds.push(newChild);
                            }
                        } else {
                            newChilds.push(currentChild);
                        }
                        break
                    default:
                        newChilds.push(currentChild);
                }
            }
            return newChilds
        }
        json.child = process(json.child);
        let cssStringOutput = CssUtil.JsonToCss(json);
        fs.writeFileSync(fileOutput,cssStringOutput,{encoding: 'utf-8'});
    }
    private constructor(){}

    static ProgramRemoveRules(fileInput: any, fileOutput: any, removeRules: any) {
        let removeRulesJson = JSON.parse(fs.readFileSync(removeRules,'utf-8').toString());
        let cssString = fs.readFileSync(fileInput,'utf-8').toString();
        let cssStringChunks = CssUtil.ParseCssStringSplitToSmallChunks(cssString);
        let json = CssUtil.ParseCssSmallChunksToJson(cssStringChunks);

        const process = function(childs: ICssNode[]): ICssNode[] {
            let newChilds: ICssNode[] = [];
            for(let i = 0; i < childs.length; i++) {
                let currentChild = childs[i];
                switch(currentChild.type) {
                    case CssNodeType.Rule:
                        {
                            let push = true;
                            for(let ruleKey in removeRulesJson) {
                                let ruleRegEx: null|RegExp = null;
                                if(ruleKey.startsWith('*') && ruleKey.endsWith('*')) { 
                                    ruleRegEx = new RegExp(ruleKey.substring(0,ruleKey.length-1).substring(1));
                                } else if(ruleKey.startsWith('*')){
                                    ruleRegEx = new RegExp(ruleKey.substring(1)+"$");
                                }else if(ruleKey.endsWith('*')){
                                    ruleRegEx = new RegExp('^'+ruleKey.substring(0,ruleKey.length-1));
                                } else {
                                    ruleRegEx = new RegExp('^'+ruleKey+"$");
                                }
                                if(ruleRegEx != null) {
                                    if( ruleRegEx.test((currentChild.name+'').trim())) {
                                        if(removeRulesJson[ruleKey] == null) {
                                            push = false;
                                        } else {
                                            let ruleValue = removeRulesJson[ruleKey];
                                            let ruleValueRegEx: null|RegExp = null;
                                            if(ruleValue.startsWith('*') && ruleValue.endsWith('*')) { 
                                                ruleValueRegEx = new RegExp(ruleValue.substring(0,ruleValue.length-1).substring(1));
                                            } else if(ruleValue.startsWith('*')){
                                                ruleValueRegEx = new RegExp(ruleValue.substring(1)+"$");
                                            }else if(ruleValue.endsWith('*')){
                                                ruleValueRegEx = new RegExp('^'+ruleValue.substring(0,ruleValue.length-1));
                                            } else {
                                                ruleValueRegEx = new RegExp('^'+ruleValue+"$");
                                            }
                                            if(ruleValueRegEx != null) {
                                                if( ruleValueRegEx.test((currentChild.body+'').trim())) {
                                                    push = false;
                                                }
                                            }
                                        }
                                    }
                                }
                                if(!push) {
                                    break;
                                }
                            }
                            if(push) {
                                newChilds.push(currentChild);
                            }   
                        }
                        break;
                    case CssNodeType.SelectorBlockCssNode:
                    case CssNodeType.MediaBlock:
                        if (currentChild.bodyJson !== undefined) {
                            let newChild = currentChild;
                            newChild.bodyJson = process(currentChild.bodyJson);
                            newChilds.push(newChild);
                        }
                        break
                    default:
                        newChilds.push(currentChild);
                }
            }
            return newChilds
        }
        json.child = process(json.child);
        let cssStringOutput = CssUtil.JsonToCss(json);
        fs.writeFileSync(fileOutput,cssStringOutput,{encoding: 'utf-8'});
    }
    public static ProgramToJson(fileInput: string, fileOutput: string) {
        let cssString = fs.readFileSync(fileInput,'utf-8').toString();
        let cssStringChunks = CssUtil.ParseCssStringSplitToSmallChunks(cssString);
        let json = CssUtil.ParseCssSmallChunksToJson(cssStringChunks);
        fs.writeFileSync(fileOutput,JSON.stringify(json),{encoding: 'utf-8'});
    }
    static ProgramFromJson(fileInput: string, fileOutput: string) {
        let json = JSON.parse(fs.readFileSync(fileInput,'utf-8').toString());
        let cssString = CssUtil.JsonToCss(json);
        console.log("fromJson: "+fileInput+" "+fileOutput);
        fs.writeFileSync(fileOutput,cssString,{encoding: 'utf-8'});
    }
    static ProgramToJsonFromJson(fileInput: string, fileOutput: string) {
        let cssStringInput = fs.readFileSync(fileInput,'utf-8').toString();
        let cssStringChunks = CssUtil.ParseCssStringSplitToSmallChunks(cssStringInput);
        let json = CssUtil.ParseCssSmallChunksToJson(cssStringChunks);
        let cssStringOutput = CssUtil.JsonToCss(json);
        fs.writeFileSync(fileOutput,cssStringOutput,{encoding: 'utf-8'});
    }
}