import * as fs from 'fs';
import CssUtil from './CssUtil';
export class Main {
    private constructor(){}

    public static ProgramToJson(fileInput: string, fileOutput: string) {
        let cssString = fs.readFileSync(fileInput,'utf-8').toString();
        let cssStringChunks = CssUtil.ParseCssStringSplitToSmallChunks(cssString);
        let json = CssUtil.ParseCssSmallChunksToJson(cssStringChunks);
        fs.writeFileSync(fileOutput,JSON.stringify(json),{encoding: 'utf-8'});
    }
}