"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiLineCommentNode = exports.OneLineCommentNode = exports.Node = exports.NodeType = void 0;
var NodeType;
(function (NodeType) {
    NodeType["OneLineComment"] = "OneLineComment";
    NodeType["MultiLineComment"] = "MultiLineComment";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
class Node {
}
exports.Node = Node;
class OneLineCommentNode extends Node {
    toJson() {
        return {
            type: this.type,
            raw: this.raw
        };
    }
    get type() {
        return NodeType.OneLineComment;
    }
    constructor(raw) {
        super();
        this.raw = raw;
    }
}
exports.OneLineCommentNode = OneLineCommentNode;
class MultiLineCommentNode extends Node {
    toJson() {
        return {
            type: this.type,
            raw: this.raw
        };
    }
    get type() {
        return NodeType.OneLineComment;
    }
    constructor(raw) {
        super();
        this.raw = raw;
    }
}
exports.MultiLineCommentNode = MultiLineCommentNode;
//# sourceMappingURL=Node.js.map