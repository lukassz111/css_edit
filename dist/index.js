#! /usr/bin/env node
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
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const commander_1 = require("commander");
const Main_1 = require("./Main");
const fs = __importStar(require("fs"));
const figlet = require("figlet");
function main(argv = process.argv) {
    const program = new commander_1.Command();
    program
        .version("1.0.0")
        .description("An example CLI for managing a directory")
        .option("-f, --file <string>", "Run file script")
        .option("-h, --help", "Display help")
        .option("-i, --in <string>", "Input File")
        .option("-o, --out <string>", "Output File")
        .option("-tJson, --toJson", "Convert scss/css to json file")
        .option("-fJson, --fromJson", "Convert json to scss file")
        .option("-fJsonTJson, --toJsonFromJson", "Convert scss to json and json convert to scss")
        .option("-rRules, --removeRules <string>", "Remove rules from file")
        .option("-rEmptyBlocks, --removeEmptyBlocks", "Remove empty blocks")
        .option("-rComments, --removeComments", "Remove comments");
    // .option("-dcr, --deleteCommentsRules <string>", "File *.json with rules to delete")
    program.parse(argv);
    const options = program.opts();
    if (options.file) {
        let file = fs.readFileSync(options.file, 'utf-8').toString().replaceAll('\r', '').split('\n');
        file.forEach(command => {
            let argv_part = command.replaceAll('  ', ' ').replaceAll('  ', ' ').trim().split(' ');
            let argv_full = [process.argv[0], process.argv[1]];
            argv_part.forEach(i => argv_full.push(i));
            main(argv_full);
        });
    }
    else if (options.help) {
        console.log(figlet.textSync("CSS Edit"));
        program.outputHelp();
        (0, process_1.exit)(0);
    }
    else if (options.in && options.out && options.toJson) {
        Main_1.Main.ProgramToJson(options.in, options.out);
    }
    else if (options.in && options.out && options.fromJson) {
        Main_1.Main.ProgramFromJson(options.in, options.out);
    }
    else if (options.in && options.out && options.toJsonFromJson) {
        Main_1.Main.ProgramToJsonFromJson(options.in, options.out);
    }
    else if (options.in && options.out && options.removeRules) {
        Main_1.Main.ProgramRemoveRules(options.in, options.out, options.removeRules);
    }
    else if (options.in && options.out && options.removeEmptyBlocks) {
        Main_1.Main.ProgramRemoveEmptyBlocks(options.in, options.out);
    }
    else if (options.in && options.out && options.removeComments) {
        Main_1.Main.ProgramRemoveComments(options.in, options.out);
    }
    else {
        console.log(figlet.textSync("CSS Edit"));
        program.outputHelp();
        (0, process_1.exit)(0);
    }
}
main(process.argv);
//# sourceMappingURL=index.js.map