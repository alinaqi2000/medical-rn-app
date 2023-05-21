const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Already have an account on this email'],
  },
  password: {
    type: String,
    required: true,
  },
});
mongoose.model('user', userSchema);
