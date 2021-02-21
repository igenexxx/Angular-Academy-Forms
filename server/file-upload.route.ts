import { Request, Response } from 'express';

export function onFileupload(req: Request, res: Response) {
  const file = req['files'].thumbnail;
  console.log('File uploaded: ', file.name);
  setTimeout(() => {
    res.status(200).json({message: 'File uploaded successfully.'});
  }, 2000);
}
