"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockCssNode = void 0;
const CssUtil_1 = __importDefault(require("../CssUtil"));
const CssNode_1 = require("./CssNode");
class BlockCssNode extends CssNode_1.CssNode {
    toJson() {
        return {
            type: this.type,
            name: this.name,
            body: this.body,
            bodyJson: this.bodyJson
        };
    }
    constructor(type, raw) {
        super(type, raw);
        this.name = '';
        this.body = '';
        this.bodyJson = {};
        let bodyStartIndex = raw.indexOf('{');
        this.name = raw.substring(0, bodyStartIndex).trim();
        this.body = raw.substring(bodyStartIndex).trim();
        if (this.body.startsWith('{')) {
            this.body = this.body.substring(1);
        }
        if (this.body.endsWith('}')) {
            this.body = this.body.substring(0, this.body.length - 1);
        }
        console.log('Start: BlockCssNode');
        this.bodyJson = CssUtil_1.default.CssToJson(this.body)['child'];
    }
}
exports.BlockCssNode = BlockCssNode;
//# sourceMappingURL=BlockCssNode.js.map