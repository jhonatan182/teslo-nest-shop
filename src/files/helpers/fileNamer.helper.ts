import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  const extension = file.mimetype.split('/')[1];

  callback(null, `${uuid()}.${extension}`);
};
