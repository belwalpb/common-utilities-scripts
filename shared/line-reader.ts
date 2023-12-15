import * as fs from 'fs';
import * as readline from 'readline';


// Create a readable stream that reads a file line by line
export function createLineReader(filePath: string): readline.Interface {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity, // To handle Windows line endings
    });
    return rl;
}