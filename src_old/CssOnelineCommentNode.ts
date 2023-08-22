
import CssNodeType from "./CssNodeType";
import { ICssNode } from "./ICssNode";

export class CssOnelineCommentNode implements ICssNode{
    constructor(public comment: string) {
    }
    public canHaveChildren(): boolean {
        return false;
    }
    public typeCssNode(): CssNodeType {
        return CssNodeType.OnelineComment();
    }
    public toCode(): string {
        return '//'+this.comment+"\n";
    }
}