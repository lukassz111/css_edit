import { CssRuleNode } from "./CssRuleNode";
import { ICssNode } from "./ICssNode";

export type CssNodeDeleteFilter = (cssNode: ICssNode) => boolean;
export type CssRuleNodeDeleteFilter = (cssNode: CssRuleNode) => boolean;