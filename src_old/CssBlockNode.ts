import { off } from "process";
import { CssNodeDeleteFilter } from "./CssNodeDeleteFilter";
import CssNodeType from "./CssNodeType";
import { CssRuleNode } from "./CssRuleNode";
import CssUtil from "./CssUtil";
import { ICssNode } from "./ICssNode";
import { ICssNodeWithChildren } from "./ICssNodeWithChildren";

export class CssBlockNode implements ICssNode, ICssNodeWithChildren {
    public static CreateFromContentString(defBlock: string,contentBlock: string,depth: number): CssBlockNode {
        let Childrens = CssUtil.ParseCssString(contentBlock,depth);
        return new CssBlockNode(defBlock,Childrens,depth)
    }
    public defBlock: string;
    constructor(defBlock: string,public Childrens: Array<ICssNode>,public depth: number) {
        for(let i = 0; i < Childrens.length; i++) {
            if(this.Childrens[i].typeCssNode().Type == CssNodeType.Rule().Type) {
                (this.Childrens[i] as CssRuleNode).Parent = this;
            }
        }
        this.defBlock = defBlock.trim();
        while(this.defBlock.match(/  /gm) != null) {
            this.defBlock = this.defBlock.replace(/  /gm,' ');
        }
    }
    
    deleteChildren(filter: CssNodeDeleteFilter): number {
        let length = this.Childrens.length;
        this.Childrens = this.Childrens.filter(item => !filter(item));
        let newLength = this.Childrens.length;
        return length-newLength;
    }
    deleteChildrenRecursive(filter: CssNodeDeleteFilter): number {
        let deleted = this.deleteChildren(filter);
        for(let i = 0; i < this.Childrens.length; i++) {
            if(!this.Childrens[i].canHaveChildren()) {
                continue;
            }
            deleted += (this.Childrens[i] as unknown as ICssNodeWithChildren).deleteChildrenRecursive(filter);
        }
        return deleted;
    }
    public canHaveChildren(): boolean {
        return true;
    }
    public typeCssNode(): CssNodeType {
        return CssNodeType.Block();
    }
    public toCode(): string {
        let x = "";

        let depthXoffset = CssUtil.GenOffset();
        x += this.Childrens.map((cssNode,index)=> cssNode.toCode()).join("\n");
        x = this.defBlock+" {\n"+x+"\n}";
        x = x.split('\n').map( v => {
            return depthXoffset+v
        }).join('\n');
        return x;
    }
}