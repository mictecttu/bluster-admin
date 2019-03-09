const Group = require('../models/ContactGroup');

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
    group = await group.save();
    req.flash('success', { msg: 'Group added successfully' });
    res.redirect('/groups');
  }catch (e) {
    req.flash('errors', { msg: e.message });
    res.json({ succcess: false, message: e.message });
  }
};
