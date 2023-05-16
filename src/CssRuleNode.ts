
import { CssBlockNode } from "./CssBlockNode";
import CssNodeType from "./CssNodeType";
import CssUtil from "./CssUtil";
import { ICssNode } from "./ICssNode";

export class CssRuleNode implements ICssNode {
    public rule: string;
    public value: string;
    public Parent: CssBlockNode|null = null;
    constructor(content: string) {
        let splitIndex = content.indexOf(':');
        this.rule = content.substring(0,splitIndex).trim();
        this.value = content.substring(splitIndex+1);
    }
    public canHaveChildren(): boolean {
        return false;
    }
    public typeCssNode(): CssNodeType {
        return CssNodeType.Rule()
    }
    public toCode(): string {
        
        return CssUtil.GenOffset()+this.rule+":"+this.value+";";
    }
}