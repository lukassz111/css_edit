import { CssNode, ICssNode, CssNodeType } from "./CssNode";

export class UndefinedCssNode extends CssNode implements ICssNode {
    constructor(raw: string) {
        super(CssNodeType.Undefined, raw);
    }
}
