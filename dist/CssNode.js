"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaBlockCssNode = exports.SelectorBlockCssNode = exports.BlockCssNode = exports.ImportCssNode = exports.MultiLineCommentCssNode = exports.OneLineCommentCssNode = exports.UndefinedCssNode = exports.CssNode = exports.CssNodeType = void 0;
var CssNodeType;
(function (CssNodeType) {
    CssNodeType["OneLineComment"] = "OneLineComment";
    CssNodeType["MultiLineComment"] = "MultiLineComment";
    CssNodeType["Import"] = "Import";
    CssNodeType["Undefined"] = "Undefined";
    CssNodeType["SelectorBlockCssNode"] = "SelectorBlockCssNode";
    CssNodeType["MediaBlock"] = "MediaBlock";
})(CssNodeType = exports.CssNodeType || (exports.CssNodeType = {}));
class CssNode {
    toJson() {
        return {
            type: this.type,
            raw: this.raw
        };
    }
    constructor(type, raw) {
        this.type = type;
        this.raw = raw;
    }
}
exports.CssNode = CssNode;
class UndefinedCssNode extends CssNode {
    constructor(raw) {
        super(CssNodeType.Undefined, raw);
    }
}
exports.UndefinedCssNode = UndefinedCssNode;
class OneLineCommentCssNode extends CssNode {
    constructor(raw) {
        super(CssNodeType.OneLineComment, raw);
    }
}
exports.OneLineCommentCssNode = OneLineCommentCssNode;
class MultiLineCommentCssNode extends CssNode {
    constructor(raw) {
        super(CssNodeType.MultiLineComment, raw);
    }
}
exports.MultiLineCommentCssNode = MultiLineCommentCssNode;
class ImportCssNode extends CssNode {
    constructor(raw) {
        super(CssNodeType.Import, raw);
    }
}
exports.ImportCssNode = ImportCssNode;
class BlockCssNode extends CssNode {
    toJson() {
        return {
            type: this.type,
            name: this.name,
            body: this.body
        };
    }
    constructor(type, raw) {
        super(type, raw);
        this.name = '';
        this.body = '';
        let bodyStartIndex = raw.indexOf('{');
        this.name = raw.substring(0, bodyStartIndex).trim();
        this.body = raw.substring(bodyStartIndex).trim();
        if (this.body.startsWith('{')) {
            this.body = this.body.substring(1);
        }
        if (this.body.endsWith('}')) {
            this.body = this.body.substring(0, this.body.length - 1);
        }
    }
}
exports.BlockCssNode = BlockCssNode;
class SelectorBlockCssNode extends BlockCssNode {
    constructor(raw) {
        super(CssNodeType.SelectorBlockCssNode, raw);
    }
}
exports.SelectorBlockCssNode = SelectorBlockCssNode;
class MediaBlockCssNode extends BlockCssNode {
    constructor(raw) {
        super(CssNodeType.MediaBlock, raw);
    }
}
exports.MediaBlockCssNode = MediaBlockCssNode;
//# sourceMappingURL=CssNode.js.map