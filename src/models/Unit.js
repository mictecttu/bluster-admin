const mongoose = require('mongoose');
const Joi = require('joi');

const { Schema, Types } = mongoose;

const UnitSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  time: {
    type: Types.Date,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Unit = mongoose.model('unit', UnitSchema);

const UnitsJoiSchema = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
  venue: Joi.string().required()
});

module.default = Unit;
module.exports.validate = (unit) => Joi.validate(unit, UnitsJoiSchema);
