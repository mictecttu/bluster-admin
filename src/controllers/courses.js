const Course = require('../models/Course');

/*
* GET /courses
* Courses home
* */
exports.index = (req, res) => {
  res.render('course/index', {
    title: 'Courses'
  });
};

/*
* GET /course/add
* Server add contact form
* */
exports.add = (req, res) => {
  res.render('course/add', {
    title: 'Add Course'
  });
};

/*
* POST /course/add
* Add a new course
* */
exports.addNew = (req, res) => {
  let course = new Course(req.body);
  course.save().then(course => {
    res.json({ success: true, course });
  }).catch(e => {
    console.log(e);
    res.json({ success: false, message: e.message });
  })
};
