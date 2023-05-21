const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: String,
  speciality: String,
  phone: String,
  email: String,
  address: String,
});

mongoose.model('doctor', DoctorSchema);
