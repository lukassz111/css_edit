"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueWithHistory = void 0;
class ValueWithHistory {
    constructor(value) {
        this.value = value;
        this.prevValue = value;
    }
    get PrevValue() {
        return this.prevValue;
    }
    get Value() {
        return this.value;
    }
    set Value(v) {
        this.prevValue = this.value;
        this.value = v;
    }
}
exports.ValueWithHistory = ValueWithHistory;
//# sourceMappingURL=ValueWithHistory.js.map