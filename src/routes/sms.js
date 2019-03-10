
const smsController = require('../controllers/sms');

const smsRoutes = (app) => {
  app.get('/sms/', smsController.index);
  app.post('/sms/send', smsController.send);
};

module.exports = smsRoutes;
