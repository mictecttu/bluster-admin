
const contactController = require('../controllers/contact');

const contactRoutes = (app) => {
  app.get('/contacts/', contactController.index);
  app.get('/contacts/add', contactController.add);
  app.post('/contacts/add', contactController.addNew);
  app.put('/contacts/edit', contactController.addNew);
}

module.exports = contactRoutes;
