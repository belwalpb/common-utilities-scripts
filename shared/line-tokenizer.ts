import { Readable } from 'stream';
import { createLineReader } from "./line-reader.js";

export function createLineTokenizer(filePath: string, fields: [string, number][]) {
  const lineReader= createLineReader(filePath);
  const readableStream = new Readable({
    objectMode: true,
    read() {

    }
});

  // Pipe the lineReader into the lineParser
  lineReader.on('line', (line) => {
    readableStream.push(transform(line, fields))
  });

  lineReader.on('close', () => {
    readableStream.push(null);
  });

  return readableStream;
}


function transform(line: string, fields: [string, number][]): Record<string,string|null>  {
   
    const parsedObject: Record<string,string|null> = {};

    let currentPosition = 0;

    // Iterate through the fields in the configuration
    for (const [fieldName, fieldLength] of fields) {

      const nextPosition= currentPosition + fieldLength;
      // Check if the line is shorter than the expected field length
      if (nextPosition > line.length) {
        parsedObject[fieldName] = null; // Set to null if not enough characters
      } else {
        const fieldValue = line.substring(currentPosition, nextPosition);
        parsedObject[fieldName] = fieldValue;
      }

      currentPosition = nextPosition;
    }

    return parsedObject;
  }
