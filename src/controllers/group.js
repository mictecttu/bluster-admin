const Group = require('../models/ContactGroup');
const Contact = require('../models/Contact');

/*
* GET /groups
* Groups home
* */
exports.index = async (req, res) => {
  // Populate helps pull the course document and only the name
  const groups = await Group.find().populate('course', 'name');
  res.render('group/index', {
    title: 'Groups',
    groups
  });
};

/*
* GET /groups/{id}
* Group home page
* */
exports.group = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    const contacts = await Contact.find();
    let members = [];
    group.members.forEach((member) => {
      contacts.forEach((contact) => { if (contact._id == member) members.push(contact) });
    });

    res.render('group/group', {
      title: group.name,
      group,
      contacts,
      members
    })
  } catch (e) {
    res.json({ message: e.message });
  }
};

/*
* GET /groups/add
* Server add group form
* */
exports.add = async (req, res) => {
  const groups = await Group.find();
  res.render('group/add', {
    title: 'Groups',
    groups
  });
};

/*
* POST /groups/add
* Add a new group
* */
exports.addNew = async (req, res) => {
  let group = new Group(req.body);
  try {
    await group.save();
    req.flash('success', { msg: 'Group added successfully' });
    res.redirect('/groups');
  }catch (e) {
    req.flash('errors', { msg: e.message });
    res.json({ success: false, message: e.message });
  }
};

/*
* POST /group/{id}/add
* Add members to a group
* */
exports.addMembers = async (req, res) => {
  let groupId = req.params.id;
  let keys = Object.keys(req.body);
  let members = keys.filter(key => { if(req.body[key] === 'on') return key });

  try {
    // Add the ids to the group
    let group = await Group.findById(groupId);
    // Remove existing members in group
    members = members.filter(member => { if(group.members.indexOf(member) === -1) return member });
    group.members.push(...members); // Spread the members
    await group.save();

    // Add the group id to each contact object
    members.forEach(async (contactId) => {
      let member = await Contact.findById(contactId);
      member.groups.push(groupId);
      await member.save();
    });
    req.flash('success', { msg: `${members.length} members added to ${group.name}` });
    res.redirect('/groups/'+groupId);
  }catch (e) {
    res.json({ message: e.message });
  }
};
