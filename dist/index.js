#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const commander_1 = require("commander");
const Main_1 = require("./Main");
const figlet = require("figlet");
const program = new commander_1.Command();
program
    .version("1.0.0")
    .description("An example CLI for managing a directory")
    .option("-h, --help", "Display help")
    .option("-i, --in <string>", "Input File")
    .option("-o, --out <string>", "Output File")
    .option("-dcr, --deleteCommentsRules <string>", "File *.json with rules to delete")
    .parse(process.argv);
const options = program.opts();
if (options.help) {
    console.log(figlet.textSync("CSS Filter"));
    program.outputHelp();
    (0, process_1.exit)(0);
}
else if (options.in && options.out && options.deleteCommentsRules) {
    Main_1.Main.ProgramRemoveCommentsAndRules(options.in, options.out, options.deleteCommentsRules);
}
else if (options.in && options.out) {
    Main_1.Main.Program(options.in, options.out);
}
//# sourceMappingURL=index.js.map