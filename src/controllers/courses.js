const Course = require('../models/Course');

/*
* GET /courses
* Courses home
* */
exports.index = async (req, res) => {
  let courses = await Course.find();
  res.render('course/index', {
    title: 'Courses',
    courses
  });
};

/*
* GET /course/add
* Server add contact form
* */
exports.add = (req, res) => {
  res.render('course/add', {
    title: 'Courses'
  });
};

/*
* POST /course/add
* Add a new course
* */
exports.addNew = async (req, res) => {
  let course = new Course(req.body);
  try {
    course = await course.save();
    req.flash('success', { msg: 'Success! Course added successfully.' });
    res.redirect('/courses/');
  }catch (e) {
    res.json({ success: false, message: e.message });
  }
};

/*
* DELETE /courses/{id}/delete
* */
exports.delete = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'course deleted' });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}