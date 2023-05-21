const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  medName: String,
  prescriptionDetails: String,
  text: String,
});

mongoose.model('prescription', PrescriptionSchema);
