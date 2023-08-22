import CssUtil from "../CssUtil";
import { CssNode, ICssNode, CssNodeType } from "./CssNode";

export abstract class BlockCssNode extends CssNode {
    public name: string = '';
    public body: string = '';
    public bodyJson: any = {};
    public override toJson(): ICssNode {
        return {
            type: this.type,
            name: this.name,
            body: this.body,
            bodyJson: this.bodyJson
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
        console.log('Start: BlockCssNode')
        this.bodyJson = CssUtil.CssToJson(this.body)['child'];
    }
}
