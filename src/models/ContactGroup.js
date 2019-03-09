const mongoose = require('mongoose');
const Joi = require('joi');

const { Schema } = mongoose;

const ContactGroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  adminPhoneNo: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  coverPhoto: {
    type: String
  },
  members: Array,
  events: Array
}, { timestamps: true });

const ContactGroup = mongoose.model('Group', ContactGroupSchema);

const ContactGroupsJoiSchema = Joi.object({
  name: Joi.string().required(),
  owner: Joi.string().required(),
  description: Joi.string().required(),
  coverPhoto: Joi.string().required(),
});

module.exports = ContactGroup;
module.exports.validate = (group) => Joi.validate(group, ContactGroupsJoiSchema);
