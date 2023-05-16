
import CssNodeType from "./CssNodeType";
import { ICssNode } from "./ICssNode";

export default class CssMultilineCommentNode implements ICssNode{
    constructor(public comment: string) {
    }
    public canHaveChildren(): boolean {
        return false;
    }
    public typeCssNode(): CssNodeType {
        return CssNodeType.MultilineComment();
    }
    public toCode(): string {
        return '/*'+this.comment+'*/';
    }
}