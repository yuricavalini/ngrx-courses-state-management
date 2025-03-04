import * as cors from 'cors';
import * as express from 'express';
import { Application } from 'express';

import { loginUser } from './auth.route';
import { createCourse } from './create-course.route';
import { deleteCourse } from './delete-course.route';
import { getAllCourses, getCourseByUrl } from './get-courses.route';
import { saveCourse } from './save-course.route';
import { searchLessons } from './search-lessons.route';

const app: Application = express();

app.set('port', 3000);

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route('/api/login').post(loginUser);

app.route('/api/courses').get(getAllCourses);

app.route('/api/courses').post(createCourse);

app.route('/api/courses/:id').put(saveCourse);

app.route('/api/courses/:id').delete(deleteCourse);

app.route('/api/courses/:courseUrl').get(getCourseByUrl);

app.route('/api/lessons').get(searchLessons);

const port = app.get('port');
app.listen(port, () => {
  console.log(`HTTP REST API Server running at http://localhost: ${port}`);
});
