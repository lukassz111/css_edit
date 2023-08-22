import { CssNode, ICssNode, CssNodeType } from "./CssNode";

export class OneLineCommentCssNode extends CssNode implements ICssNode {
    constructor(raw: string) {
        super(CssNodeType.OneLineComment, raw);
    }
}
