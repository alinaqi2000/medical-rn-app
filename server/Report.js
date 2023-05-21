const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  medName: String,
  medForm: String,
  date: Date,
});

mongoose.model('report', ReportSchema);
