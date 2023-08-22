export default class CssNodeType {
    public static Root(): CssNodeType {
        return new CssNodeType('root');
    }
    public static MultilineComment(): CssNodeType {
        return new CssNodeType('multiline_comment');
    }
    public static OnelineComment(): CssNodeType {
        return new CssNodeType('oneline_comment');
    }
    public static Block(): CssNodeType {
        return new CssNodeType('block');
    }
    public static Rule(): CssNodeType {
        return new CssNodeType('rule');
    }
    private constructor(
        private type: string
    ) {}
    public get Type(): string {
        return this.type;
    }
}