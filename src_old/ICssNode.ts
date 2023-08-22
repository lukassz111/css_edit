import CssNodeType from "./CssNodeType";

export interface ICssNode {
    toCode(): string;
    typeCssNode(): CssNodeType,
    canHaveChildren(): boolean;
}