// models/userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageUrl: { type: String }, // Optional field to store the uploaded image path
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
