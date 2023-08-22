import { ICssNode, CssNodeType } from "./CssNode";
import { BlockCssNode } from "./BlockCssNode";

export class MediaBlockCssNode extends BlockCssNode implements ICssNode {
    constructor(raw: string) {
        super(CssNodeType.MediaBlock, raw);
    }
}
