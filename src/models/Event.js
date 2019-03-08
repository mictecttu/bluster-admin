const mongoose = require('mongoose');
const Joi = require('joi');

const { Schema, Types } = mongoose;

const EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  organizer: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  coverPhoto: {
    type: String
  },
  photos: Types.Array,
  rsvps: Types.Array,
  requirements: Types.Array,
  date: Types.Date,
  venue: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Event = mongoose.model('event', EventSchema);

const EventsJoiSchema = Joi.object({
  title: Joi.string().required(),
  organizer: Joi.string().required(),
  description: Joi.string().required(),
  coverPhoto: Joi.string().required(),
});

module.default = Event;
module.exports.validate = (event) => Joi.validate(event, EventsJoiSchema);
