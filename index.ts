import { createLineTokenizer } from "./shared/line-tokenizer.js";
import config1 from './tokens-config/config1.js';

const filePath= "D:/javascript-related-stuff/common-utilities-scripts/resources/file.txt"

const tokenizer= createLineTokenizer(filePath, config1);


  // Pipe the lineReader into the lineParser
  tokenizer.on('data', (data) => {
    console.log(data);
  });

  tokenizer.on('close', () => {
    console.log('Completed');
  });
