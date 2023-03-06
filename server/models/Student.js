const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: String,
  year: String,
  rollNumber: {
    type: String,
    unique: true,
  },
  phone: String,
  
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", studentSchema);
