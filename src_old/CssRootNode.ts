
import { off } from "process";
import { CssNodeDeleteFilter } from "./CssNodeDeleteFilter";
import CssNodeType from "./CssNodeType";
import CssUtil from "./CssUtil";
import { ICssNode } from "./ICssNode";
import { ICssNodeWithChildren } from "./ICssNodeWithChildren";

export class CssRootNode implements ICssNode, ICssNodeWithChildren {
    public Childrens: Array<ICssNode> = []
    addCssString(cssString: string) {
        this.Childrens = CssUtil.ParseCssString(cssString);
    }
    public canHaveChildren(): boolean {
        return true;
    }
    public typeCssNode(): CssNodeType {
        return CssNodeType.Root();
    }
    public toCode(): string {
        return this.Childrens.map((cssNode,index)=> {
            let offset = CssUtil.GenOffset();
            let result = cssNode.toCode().split('\n').map(v => v.startsWith(offset) ? v.substring(offset.length) : v).join('\n');
            return result;
        }).join("\n");
    }
    public constructor() {}

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
    public deleteEmptyNodes(): void {
        const filter = (cssNode: ICssNode) => {
            if(cssNode.canHaveChildren()) {
                let cssChildrenNode: ICssNodeWithChildren = cssNode as unknown as ICssNodeWithChildren;
                if(cssChildrenNode.Childrens.length == 0) {
                    return true;
                }
                return false;
            } else {
                return false;
            }
        }
        let deletedItems = 0;
        do {
            deletedItems = this.deleteChildrenRecursive(filter);
        } while(deletedItems > 0)
    }
}
