import { CssNodeDeleteFilter } from "./CssNodeDeleteFilter"
import { CssRuleNode } from "./CssRuleNode"
import { ICssNode } from "./ICssNode"

export interface ICssNodeWithChildren {
    Childrens: Array<ICssNode>
    deleteChildren( filter: CssNodeDeleteFilter ): number
    deleteChildrenRecursive( filter: CssNodeDeleteFilter ): number
}