import fs from 'fs';

function readFileSync(filename: string, resolve, reject): void {
  let fileData = '';

  try {
    fs.readFile(filename, { encoding: 'utf-8' }, function (err, data) {
      if (!err) {
        fileData += data;
        resolve(fileData);
      } else {
        reject(err);
      }
    });
  } catch (err) {
    reject(err);
  }
}

function readFile(fileName: string): Promise<string> {
  let resolve: (value: string | PromiseLike<string>) => void;
  let reject: (reason?: any) => void;

  const promise = new Promise<string>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  setTimeout(() => {
    readFileSync(fileName, resolve, reject);
  }, 0);

  return promise;
}

export { readFile };
