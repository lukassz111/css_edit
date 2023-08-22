import { ICssNode, CssNodeType } from "./CssNode";
import { BlockCssNode } from "./BlockCssNode";

export class SelectorBlockCssNode extends BlockCssNode implements ICssNode {
    constructor(raw: string) {
        super(CssNodeType.SelectorBlockCssNode, raw);
    }
}
