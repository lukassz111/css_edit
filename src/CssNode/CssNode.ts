export enum CssNodeType {
    OneLineComment = 'OneLineComment',
    MultiLineComment = 'MultiLineComment',
    Import = 'Import',
    Undefined = 'Undefined',
    SelectorBlockCssNode = 'SelectorBlockCssNode',
    MediaBlock = 'MediaBlock',
    Rule = 'Rule',
    CssVariable = 'CssVariable'
}
export interface ICssNode {
    type: CssNodeType
    raw?: string
    name?: string
    body?: string
    bodyJson?: any
}
export abstract class CssNode implements ICssNode {
    public toJson(): ICssNode {
        return {
            type: this.type,
            raw: this.raw
        };
    }
    public toCode(): string {
        console.log("method toCode not overriden for type: "+this.type);
        return this.raw;
    }
    constructor(public type: CssNodeType, public raw: string) {
    }
}

export class RuleCssNode extends CssNode implements ICssNode {
    public name: string = '';
    public body: string = '';
    public override toJson(): ICssNode {
        return {
            type: this.type,
            name: this.name,
            body: this.body
        };
    }
    constructor(raw: string) {
        super(CssNodeType.Rule, raw);
        let splitIndex = raw.indexOf(':');
        this.name = raw.substring(0,splitIndex).trim();
        this.body = raw.substring(splitIndex).trim();
        if(this.body.startsWith(':')) {
            this.body = this.body.substring(1);
        }
        if(this.body.endsWith(';')) {
            this.body = this.body.substring(0,this.body.length-1);
        }
        this.body = this.body.trim();
    }
}


export class CssVariableCssNode extends CssNode implements ICssNode {
    public name: string = '';
    public body: string = '';
    public override toJson(): ICssNode {
        return {
            type: this.type,
            name: this.name,
            body: this.body
        };
    }
    constructor(raw: string) {
        super(CssNodeType.CssVariable, raw);
        let splitIndex = raw.indexOf(':');
        this.name = raw.substring(0,splitIndex).trim();
        this.body = raw.substring(splitIndex).trim();
        if(this.body.startsWith(':')) {
            this.body = this.body.substring(1);
        }
        if(this.body.endsWith(';')) {
            this.body = this.body.substring(0,this.body.length-1);
        }
        this.body = this.body.trim();
    }
}