import { CssNode, ICssNode, CssNodeType } from "./CssNode";

export class MultiLineCommentCssNode extends CssNode implements ICssNode {
    constructor(raw: string) {
        super(CssNodeType.MultiLineComment, raw);
    }
}
