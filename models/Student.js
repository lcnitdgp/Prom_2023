const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: String,
  department: String,
  roll_no: {
    type: String,
    unique: true,
  },
  email: String,
  phone: String,
  photo: String,
  clubs: String,
  wing: String,
  quote: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", studentSchema);
