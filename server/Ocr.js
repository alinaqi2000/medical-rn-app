const mongoose = require('mongoose');

const OcrSchema = new mongoose.Schema({
  text: String,
});

mongoose.model('ocr', OcrSchema);
