"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportCssNode = void 0;
const CssNode_1 = require("./CssNode");
class ImportCssNode extends CssNode_1.CssNode {
    constructor(raw) {
        super(CssNode_1.CssNodeType.Import, raw);
    }
}
exports.ImportCssNode = ImportCssNode;
//# sourceMappingURL=ImportCssNode.js.map