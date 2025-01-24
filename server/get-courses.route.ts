import { Request, Response } from 'express';

import { COURSES } from './db-data';

export function getAllCourses(req: Request, res: Response) {
  console.log('Retrieving courses data...');

  setTimeout(() => {
    res.status(200).json({ payload: Object.values(COURSES) });
  }, 1000);
}

export function getCourseByUrl(req: Request, res: Response) {
  const courseUrl = req.params['courseUrl'];

  const courses = Object.values(COURSES);

  const course = courses.find(course => course.url == courseUrl);

  if (!course) {
    setTimeout(() => {
      res.status(200).json([]);
    }, 1000);
    return;
  }

  setTimeout(() => {
    res.status(200).json(course);
  }, 1000);
}
