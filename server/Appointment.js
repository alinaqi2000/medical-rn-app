const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  title: String,
  date: Date,
  location: String,
  notes: String,
});

mongoose.model('appointment', AppointmentSchema);
