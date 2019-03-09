const Course = require('../models/Course');
const Contact = require('../models/Contact');

/*
* GET /contacts
* Contacts home
* */
exports.index = async (req, res) => {
  // Populate helps pull the course document and only the name
  const contacts = await Contact.find().populate('course', 'name');
  res.render('contacts/index', {
    title: 'Contacts',
    contacts
  });
};

/*
* GET /contacts/add
* Server add contact form
* */
exports.add = async (req, res) => {
  const courses = await Course.find();
  res.render('contacts/add', {
    title: 'Contacts',
    courses
  });
};

/*
* POST /contacts/add
* Add a new contact
* */
exports.addNew = async (req, res) => {
  let contact = new Contact(req.body);
  try {
    contact = await contact.save();
    req.flash('success', { msg: 'Contact added successfully' });
    res.redirect('/contacts');
  }catch (e) {
    req.flash('errors', { msg: e.message });
    res.json({ succcess: false, message: e.message });
  }
};
