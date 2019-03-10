const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const groupController = require('../controllers/group');
const storage = multer.diskStorage({
  destination: 'public/images/uploads/groups',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      let filename = raw.toString('hex') + path.extname(file.originalname);
      // pass the file name to the req body
      req.body.coverPhoto = filename;
      cb(null, filename)
    })
  }
});
const upload = multer({ storage });


const groupRoutes = (app) => {
  app.get('/groups/', groupController.index);
  app.get('/groups/add', groupController.add);
  app.post('/groups/add', upload.single('coverPhoto'), groupController.addNew);
  app.put('/groups/edit', groupController.addNew);
  app.get('/groups/:id', groupController.group);
  app.post('/groups/:id/add', groupController.addMembers);
};

module.exports = groupRoutes;
