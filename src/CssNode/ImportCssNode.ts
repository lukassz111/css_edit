import { CssNode, ICssNode, CssNodeType } from "./CssNode";

export class ImportCssNode extends CssNode implements ICssNode {
    constructor(raw: string) {
        super(CssNodeType.Import, raw);
    }
}
