"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CssNodeType {
    static Root() {
        return new CssNodeType('root');
    }
    static MultilineComment() {
        return new CssNodeType('multiline_comment');
    }
    static OnelineComment() {
        return new CssNodeType('oneline_comment');
    }
    static Block() {
        return new CssNodeType('block');
    }
    static Rule() {
        return new CssNodeType('rule');
    }
    constructor(type) {
        this.type = type;
    }
    get Type() {
        return this.type;
    }
}
exports.default = CssNodeType;
//# sourceMappingURL=CssNodeType.js.map