const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  url: { type: String, unique: true },
  postedAt: Date,
}, { timestamps: true });
module.exports = mongoose.model('Job', JobSchema);
