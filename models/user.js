const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, 
  pw: { type: String, required: true }, 
  name: { type: String }
});

userSchema.statics.authenticate = function (id, pw, callback) {
  User.findOne({ id: id })
    .exec(function (err, user) {
      if (err) return callback(err);
      else if (!user) {
	var err = new Error('User not found');
	err.status = 401;
	return callback(err);
      }
      bcrypt.compare(pw, user.pw, function (err, result) {
	if (result) return callback(null, user);
	else return callback();
      });
    });
}

mongoose.set('useCreateIndex', true);

const User = mongoose.model('User', userSchema);
module.exports = User;
