
const coursesController = require('../controllers/courses');

const coursesRoutes = (app) => {
  app.get('/courses/', coursesController.index);
  app.get('/courses/add', coursesController.add);
  app.post('/courses/add', coursesController.addNew);
  app.put('/courses/edit', coursesController.addNew);
  app.delete('/courses/:id', coursesController.delete);
}

module.exports = coursesRoutes;
