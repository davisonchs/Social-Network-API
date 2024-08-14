const User = require('../models/user');

const userController = {
  getUsers(req, res) {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
  },
  
};

module.exports = userController;
