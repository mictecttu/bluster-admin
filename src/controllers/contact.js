const User = require('../models/User');

/*
* GET /contacts
* Contacts home
* */
exports.index = (req, res) => {
  res.render('contacts/index', {
    title: 'Contacts'
  });
};

/*
* GET /contacts/add
* Server add contact form
* */
exports.add = (req, res) => {
  res.render('contacts/add', {
    title: 'Add Contact'
  });
};

/*
* POST /contacts/add
* Add a new contact
* */
exports.addNew = (req, res) => {
  console.log(req.body);
  res.json({ success: true });
};
