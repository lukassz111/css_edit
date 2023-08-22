"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufforText = void 0;
class BufforText {
    constructor(text = '') {
        this.text = text;
    }
    LastLine(index = 0) {
        if (this.text.indexOf('\r') >= 0) {
            let x = this.text.split('\r\n');
            return x[(x.length - 1) - index];
        }
        else {
            let x = this.text.split('\n');
            return x[(x.length - 1) - index];
        }
    }
    RemoveLastLine(index = 0) {
        if (this.text.indexOf('\r') >= 0) {
            let x = this.text.split('\r\n');
            let newText = x.filter((v, i) => {
                return !(i == ((x.length - 1) - index));
            }).join('\r\n');
            this.Text = newText;
        }
        else {
            let x = this.text.split('\n');
            let newText = x.filter((v, i) => {
                return !(i == ((x.length - 1) - index));
            }).join('\n');
            this.Text = newText;
        }
    }
    get Text() {
        return this.text;
    }
    set Text(value) {
        this.text = value;
    }
    get Json() {
        return {
            'text': this.text,
            'lastLine0': this.LastLine(0),
            'lastLine1': this.LastLine(1)
        };
    }
}
exports.BufforText = BufforText;
//# sourceMappingURL=BufforText.js.map