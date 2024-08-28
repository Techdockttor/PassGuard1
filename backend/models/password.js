const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passwordSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['active', 'expired'], default: 'active' }
});

const Password = mongoose.model('Password', passwordSchema);

module.exports = Password;
