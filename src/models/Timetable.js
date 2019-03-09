const mongoose = require('mongoose');
const Joi = require('joi');

const { Schema, Types } = mongoose;

const TimetableSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "classes"
  },
  units: {
    type: Array
  }
}, { timestamps: true });

const Timetable = mongoose.model('timetable', TimetableSchema);

const TimetablesJoiSchema = Joi.object({
  name: Joi.string().required()
});

module.default = Timetable;
module.exports.validate = (course) => Joi.validate(course, TimetablesJoiSchema);
