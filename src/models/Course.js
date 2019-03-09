
const mongoose = require('mongoose');
const Joi = require('joi');

const { Schema } = mongoose;

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  timetable: Array
}, { timestamps: true });

CourseSchema.methods.validateCourse = (course) => Joi.validate(course, CoursesJoiSchema);

const Course = mongoose.model('course', CourseSchema);

const CoursesJoiSchema = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required()
});

module.exports = Course;
