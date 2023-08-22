"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const fs = __importStar(require("fs"));
const CssUtil_1 = __importDefault(require("./CssUtil"));
class Main {
    constructor() { }
    static ProgramToJson(fileInput, fileOutput) {
        let cssString = fs.readFileSync(fileInput, 'utf-8').toString();
        let cssStringChunks = CssUtil_1.default.ParseCssStringSplitToSmallChunks(cssString);
        let json = CssUtil_1.default.ParseCssSmallChunksToJson(cssStringChunks);
        fs.writeFileSync(fileOutput, JSON.stringify(json), { encoding: 'utf-8' });
    }
}
exports.Main = Main;
//# sourceMappingURL=Main.js.map