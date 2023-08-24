#! /usr/bin/env node
import { exit } from "process";
import { Command } from "commander";
import { Main } from "./Main";
import * as fs from 'fs';
const figlet = require("figlet");

function main(argv: string[] = process.argv) {
  
  const program = new Command();

  program
    .version("1.0.0")
    .description("An example CLI for managing a directory")
    .option("-f, --file <string>","Run file script")
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
  if(options.file) {
    let file = fs.readFileSync(options.file,'utf-8').toString().replaceAll('\r','').split('\n');
    file.forEach(command => {
      let argv_part = command.replaceAll('  ',' ').replaceAll('  ',' ').trim().split(' ');
      let argv_full = [process.argv[0], process.argv[1]]
      argv_part.forEach(i => argv_full.push(i));
      main(argv_full);
    })
  }
  else if(options.help) {
      console.log(figlet.textSync("CSS Edit"));
      program.outputHelp();
      exit(0);
  }
  else if(options.in && options.out && options.toJson) {
      Main.ProgramToJson(options.in, options.out);
  }
  else if(options.in && options.out && options.fromJson) {
      Main.ProgramFromJson(options.in, options.out);
  }
  else if(options.in && options.out && options.toJsonFromJson) {
      Main.ProgramToJsonFromJson(options.in, options.out);
  }
  else if(options.in && options.out && options.removeRules) {
      Main.ProgramRemoveRules(options.in, options.out,options.removeRules);
  }
  else if(options.in && options.out && options.removeEmptyBlocks) {
      Main.ProgramRemoveEmptyBlocks(options.in, options.out);
  }
  else if(options.in && options.out && options.removeComments) {
      Main.ProgramRemoveComments(options.in, options.out);
  }
  else {
    console.log(figlet.textSync("CSS Edit"));
    program.outputHelp();
    exit(0);
  }
}

main(process.argv);