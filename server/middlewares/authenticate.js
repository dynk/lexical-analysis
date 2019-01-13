const UsersModel = require('./../models/users');

const isAdmin = (req, res, next) => {
  const authenticationToken = req.header('x-auth');
  UsersModel.findByToken(authenticationToken).then((user) => {
    if (!user || !user.isAdmin) {
      return Promise.reject();
    }
    req.user = user;
    req.authenticationToken = authenticationToken;
    next();
  }).catch((err) => {
    res.status(401).send(err);
  });
};

module.exports = {
  isAdmin
};
