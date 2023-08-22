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
  .option("-tJson, --toJson", "Convert scss/css to json file")
  // .option("-dcr, --deleteCommentsRules <string>", "File *.json with rules to delete")
  .parse(process.argv);

const options = program.opts();

if(options.help) {
    console.log(figlet.textSync("CSS Edit"));
    program.outputHelp();
    exit(0);
}
else if(options.in && options.out && options.toJson) {
    Main.ProgramToJson(options.in, options.out);
}
else {
  console.log(figlet.textSync("CSS Edit"));
  program.outputHelp();
  exit(0);
}
