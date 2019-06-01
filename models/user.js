const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, 
  pw: { type: String, required: true }, 
  name: { type: String }
});

mongoose.set('useCreateIndex', true);

module.exports = mongoose.model('User', userSchema);
