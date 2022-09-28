import * as fs from 'fs';

import path from 'path';

export const readFile = (filename: string): string => {
  const fileContents = fs.readFileSync(
    path.join(__dirname, '../../data/' + filename),
    {
      encoding: 'utf-8',
    },
  );

  return fileContents;
};
