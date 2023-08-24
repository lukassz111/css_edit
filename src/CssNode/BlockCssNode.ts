import CssUtil from "../CssUtil";
import { CssNode, ICssNode, CssNodeType } from "./CssNode";

export abstract class BlockCssNode extends CssNode {
    public name: string = '';
    public body: string = '';
    public bodyJson?: any = null;
    public override toJson(): ICssNode {
        if(this.bodyJson != null) {
            return {
                type: this.type,
                name: this.name,
                bodyJson: this.bodyJson
            };
        }
        return {
            type: this.type,
            name: this.name,
            body: this.body
        };
    }
    constructor(type: CssNodeType, raw: string) {
        super(type, raw);
        let bodyStartIndex = raw.indexOf('{');
        this.name = raw.substring(0, bodyStartIndex).trim();
        this.body = raw.substring(bodyStartIndex).trim();
        if (this.body.startsWith('{')) {
            this.body = this.body.substring(1);
        }
        if (this.body.endsWith('}')) {
            this.body = this.body.substring(0, this.body.length - 1);
        }
        this.bodyJson = CssUtil.CssToJson(this.body)['child'];
    }
}
