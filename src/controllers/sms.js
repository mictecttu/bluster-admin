const Group = require('../models/ContactGroup');
const Contact = require('../models/Contact');
const logger = require('../utils/logger');

// Set your app credentials
const credentials = {
  apiKey: process.env.AiT_API_KEY,
  username: process.env.AiT_APP_USERNAME
};

// Initialize the SDK
const AfricasTalking = require('africastalking')(credentials);

// Get the SMS service
const sms = AfricasTalking.SMS;

function sendMessage(from, to, message) {
  const options = {
    to,
    message,
    from
  };

  return sms.send(options);
}


/*
* GET /sms
* SMSs home
* */
exports.index = async (req, res) => {
  const groups = await Group.find();
  res.render('sms/index', {
    title: 'Contacts',
    groups
  });
};

/*
* POST /sms/send
* Send bulk sms
* */
exports.send = async (req, res) => {
  let group;
  let contacts;
  let groupId = req.body.group;
  let message = req.body.message;
  //TODO Check for empty message or contacts
  try {
    group = await Group.findById(groupId);
    contacts = await Contact.find({ _id: { $in: group.members } });
  }catch (e) {
    res.json({ message: e.message });
  }

  let phoneNumbers = [];
  contacts.forEach((contact) => {
    let number = contact.phoneNo.length === 9? `+254${contact.phoneNo}`: contact.phoneNo;
    phoneNumbers.push(number);
  } );
  let from = group.adminPhoneNo.length === 9? `+254${group.adminPhoneNo}`: group.adminPhoneNo;

  // send the message
  sendMessage('', phoneNumbers, message)
    .then((response) => {
      res.json({ success: true, ...response });
      // TODO collect responses to database
      // Save the message, group and response
      response.SMSMessageData.payload = message;
      response.SMSMessageData.group = groupId;
      logger(response);
    })
    .catch((e) => {
      res.json({success: false, message: e.message });
    });
};
