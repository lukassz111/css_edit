#! /usr/bin/env node
import { exit } from "process";
import { Command } from "commander";
import { Main } from "./Main";
const figlet = require("figlet");

const program = new Command();

program
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .option("-h, --help", "Display help")
  .option("-i, --in <string>", "Input File")
  .option("-o, --out <string>", "Output File")
  .option("-dcr, --deleteCommentsRules <string>", "File *.json with rules to delete")
  .parse(process.argv);

const options = program.opts();

if(options.help) {
    console.log(figlet.textSync("CSS Filter"));
    program.outputHelp();
    exit(0);
}
else if(options.in && options.out && options.deleteCommentsRules) {
  Main.ProgramRemoveCommentsAndRules(options.in,options.out,options.deleteCommentsRules);
}
else if(options.in && options.out) {
    Main.Program(options.in, options.out);
}
