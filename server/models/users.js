const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { bcryptTextAsync, bcryptCompareAsync} = require('../utils/encryption');

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  authenticationTokens: [{
    access: {
      type: String,
      required: true
    },
    authenticationToken: {
      type: String,
      required: true
    }
  }]
});



UsersSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  // TODO - return expiresIn
  const authenticationToken = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET, { expiresIn: '8h' }).toString();
  user.authenticationTokens.push({access, authenticationToken});
  return user.save().then(() => authenticationToken);
};

UsersSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

UsersSchema.methods.removeToken = function (authenticationToken) {
  const user = this;
  return user.update({
    $pull: {
      authenticationTokens: {authenticationToken}
    }
  });
};

UsersSchema.statics.findByToken = function (authenticationToken) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(authenticationToken, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }
  return User.findOne({
    '_id': decoded._id,
    'authenticationTokens.authenticationToken': authenticationToken,
    'authenticationTokens.access': 'auth'
  });
};

UsersSchema.statics.findByCredentials = function (email, password) {
  const User = this;
  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return bcryptCompareAsync(password, user.password).then(() => user);
  });
};

UsersSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcryptTextAsync(user.password).then((hash) => {
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('users', UsersSchema);
