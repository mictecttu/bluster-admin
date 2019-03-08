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
exports.addNew =  (req, res) => {
  let course = new Course(req.body);
  // course.name = req.body.name;
  // course.code = req.body.code;
  // course.department = req.body.department;
  // let isValid, { message } = await course.validate(course);
  // if(isValid) {
  //   return res.status(500).json({ success: false, message: 'Invalid object' });
  // }
  // course = await
  course.save().then(course=> {
    res.json({ success: true, course });
  }).catch(e=> {
    res.json({ success: true, course });
  });
};
