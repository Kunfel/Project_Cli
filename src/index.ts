#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';

const program = new Command();

// Helper function to generate boilerplate code
function generateBoilerplate(functionName: string, language: 'python' | 'javascript', inputs: string[]): string {
    const inputString = inputs.join(', ');
    if (language === 'javascript') {
        return `def ${functionName}(${inputString}): {\n    // Your code here\n    return;\n}`;
    } else if (language === 'python') {
        return `function ${functionName}(${inputString}) \n    # Your code here\n    return\n`;
    } else {
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
    .action(async (options) => {
        const { name, language, inputs } = options;
        const inputArray = inputs.split(',');

        if (!['python', 'javascript'].includes(language)) {
            console.error('Error: Supported languages are python and javascript.');
            process.exit(1);
        }

        const confirmation = await inquirer.prompt([
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

        fs.writeFileSync(fileName, boilerplate);
        console.log(`Boilerplate code generated and saved to ${fileName}`);
    });

program.parse(process.argv);
