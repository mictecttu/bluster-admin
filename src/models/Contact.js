const mongoose = require('mongoose');
const Joi = require('joi');

const { Schema, Types } = mongoose;

const ContactSchema = new Schema({
  phoneNo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  idNo: {
    type: Number,
  },
  reqNo: {
    type: String
  },
  name: {
    type: String
  },
  course: {
    type: Types.ObjectId,
    ref: 'Course'
  },
  isPublic: {
    type: Types.Boolean,
    default: false
  },
  groups: {
    type: Types.Array
  }
}, { timestamps: true });

const Contact = mongoose.model('Contact', ContactSchema);

const ContactsJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  phone: Joi.number().integer().positive().greater(0).required(),
  idNo: Joi.number().greater(0).required(),
  course: Joi.number().greater(0).required(),
  isPublic: Joi.boolean(),
});

module.default = Contact;
module.exports.validate = (contact) => Joi.validate(contact, ContactsJoiSchema);
