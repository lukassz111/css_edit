export class BufforText {
    constructor(protected text: string = '') {}
    public LastLine(index: number = 0): string {
        if(this.text.indexOf('\r') >= 0) {
            let x = this.text.split('\r\n');
            return x[(x.length-1)-index];
        } else {
            let x = this.text.split('\n');
            return x[(x.length-1)-index];
        }
    }
    public RemoveLastLine(index: number = 0) {
        if(this.text.indexOf('\r') >= 0) {
            let x = this.text.split('\r\n');
            let newText = x.filter((v,i)=> {
                return !( i == ((x.length-1)-index))
            }).join('\r\n');
            this.Text = newText;
        } else {
            let x = this.text.split('\n');
            let newText = x.filter((v,i)=> {
                return !( i == ((x.length-1)-index))
            }).join('\n');
            this.Text = newText;
        }
    }
    public get Text(): string {
        return this.text;
    }
    public set Text(value:string) {
        this.text = value;
    }
    public get Json(): any {
        return {
            'text': this.text,
            'lastLine0': this.LastLine(0),
            'lastLine1': this.LastLine(1)
        }
    }
}