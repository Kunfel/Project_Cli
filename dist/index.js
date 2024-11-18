#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = __importDefault(require("fs"));
const program = new commander_1.Command();
// Helper function to generate boilerplate code
function generateBoilerplate(functionName, language, inputs) {
    const inputString = inputs.join(', ');
    if (language === 'javascript') {
        return `def ${functionName}(${inputString}): {\n    // Your code here\n    return;\n}`;
    }
    else if (language === 'python') {
        return `function ${functionName}(${inputString}) \n    # Your code here\n    return\n`;
    }
    else {
        throw new Error('Unsupported language.');
    }
}
// CLI command
program
    .name('code-cli')
    .description('A CLI to generate boilerplate code for coding challenges.')
    .version('1.0.0')
    .requiredOption('-n, --name <functionName>', 'Function name')
    .requiredOption('-l, --language <language>', 'Programming language (python/javascript)')
    .requiredOption('-i, --inputs <inputs>', 'Comma-separated list of function inputs')
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, language, inputs } = options;
    const inputArray = inputs.split(',');
    if (!['python', 'javascript'].includes(language)) {
        console.error('Error: Supported languages are python and javascript.');
        process.exit(1);
    }
    const confirmation = yield inquirer_1.default.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: `Generate boilerplate code for the function ${name} in ${language}?`,
            default: false,
        },
    ]);
    if (!confirmation.confirm) {
        console.log('Operation canceled.');
        return;
    }
    const boilerplate = generateBoilerplate(name, language, inputArray);
    const fileExtension = language === 'python' ? 'py' : 'js';
    const fileName = `${name}.${fileExtension}`;
    fs_1.default.writeFileSync(fileName, boilerplate);
    console.log(`Boilerplate code generated and saved to ${fileName}`);
}));
program.parse(process.argv);
