const mongoose = require("mongoose");
const { Schema } = mongoose;

const Student = new Schema({
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

const partnerSchema = new Schema({
  students: [Student],
  payTo: String,
  paymentProof: String,
});

module.exports = mongoose.model("Partner", partnerSchema);
