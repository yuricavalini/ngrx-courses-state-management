import { Request, Response } from 'express';

import { COURSES } from './db-data';

export function deleteCourse(req: Request, res: Response) {
  console.log('Deleting course...');

  const id = req.params['id'];

  delete COURSES[parseInt(id)];

  setTimeout(() => {
    res.status(200).json({ id });
  }, 2000);
}
